import { NextResponse } from 'next/server'
import { google } from 'googleapis'

// Configure Google OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
)

// Set refresh token
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
})

// Create calendar client
const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

/**
 * Creates a calendar event from appointment details
 * @param appointmentDetails The appointment details from the chat
 */
async function createCalendarEvent(appointmentDetails: any) {
  try {
    const {
      name,
      email,
      date,
      time,
      topic = 'Consultation Call'
    } = appointmentDetails

    if (!name || !email || !date) {
      throw new Error('Missing required appointment details')
    }

    // Parse date and time strings
    // Support multiple date formats (YYYY-MM-DD, MM/DD/YYYY, etc.)
    let dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
      // Try alternative date parsing if needed
      const dateParts = date.split(/[\/\-\.]/)
      if (dateParts.length === 3) {
        // Try different formats
        dateObj = new Date(
          parseInt(dateParts[2].length === 4 ? dateParts[2] : `20${dateParts[2]}`),
          parseInt(dateParts[0]) - 1,
          parseInt(dateParts[1])
        )
      }
      
      if (isNaN(dateObj.getTime())) {
        throw new Error(`Invalid date format: ${date}`)
      }
    }

    // Parse time if provided
    let startDateTime = new Date(dateObj)
    let endDateTime = new Date(dateObj)
    
    if (time) {
      // Extract hours and minutes from time string (e.g. "3:00 PM", "15:00")
      const timeMatch = time.match(/(\d+)(?::(\d+))?\s*(am|pm)?/i)
      if (timeMatch) {
        let hours = parseInt(timeMatch[1])
        const minutes = parseInt(timeMatch[2] || '0')
        const period = timeMatch[3]?.toLowerCase()
        
        // Convert to 24-hour format if needed
        if (period === 'pm' && hours < 12) {
          hours += 12
        } else if (period === 'am' && hours === 12) {
          hours = 0
        }
        
        startDateTime.setHours(hours, minutes, 0, 0)
        endDateTime.setHours(hours + 1, minutes, 0, 0) // Default to 1-hour meeting
      }
    } else {
      // Default to a meeting at 10:00 AM if no time specified
      startDateTime.setHours(10, 0, 0, 0)
      endDateTime.setHours(11, 0, 0, 0)
    }

    // Format for Google Calendar API
    const startTime = startDateTime.toISOString()
    const endTime = endDateTime.toISOString()

    // Create calendar event
    console.log(`[Calendar API] Creating event for ${name} (${email}) on ${startTime}`)
    
    const event = {
      summary: `Meeting with ${name}`,
      description: `Topic: ${topic}\nContact: ${email}`,
      start: {
        dateTime: startTime,
        timeZone: 'America/Los_Angeles', // Pacific timezone
      },
      end: {
        dateTime: endTime,
        timeZone: 'America/Los_Angeles', // Pacific timezone
      },
      attendees: [
        { email: email, displayName: name },
        // Add your own email if you want to receive the invite
        // { email: 'your-email@example.com' } 
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    }

    const result = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      sendUpdates: 'all', // Send email notifications
    })

    return {
      success: true,
      eventId: result.data.id,
      eventLink: result.data.htmlLink,
      startTime,
      endTime
    }
  } catch (error: any) {
    console.error('[Calendar API] Error creating event:', error.message)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Check availability on a given date and return available time slots
 * @param dateString Date string in any recognizable format
 * @returns Array of available time slots in HH:MM format
 */
async function checkAvailability(dateString: string) {
  try {
    // Parse the date string
    let dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) {
      // Try alternative date parsing if needed
      const dateParts = dateString.split(/[\/\-\.]/);
      if (dateParts.length === 3) {
        // Try different formats (MM/DD/YYYY or similar)
        dateObj = new Date(
          parseInt(dateParts[2].length === 4 ? dateParts[2] : `20${dateParts[2]}`),
          parseInt(dateParts[0]) - 1,
          parseInt(dateParts[1])
        );
      }
      
      if (isNaN(dateObj.getTime())) {
        throw new Error(`Invalid date format: ${dateString}`);
      }
    }
    
    // Set to midnight of the requested date
    const startOfDay = new Date(dateObj);
    startOfDay.setHours(0, 0, 0, 0);
    
    // Set to end of the requested date
    const endOfDay = new Date(dateObj);
    endOfDay.setHours(23, 59, 59, 999);
    
    // Business hours (9 AM to 5 PM)
    const businessStartHour = 9;
    const businessEndHour = 17;
    
    // Default time slots (hourly from 9 AM to 5 PM)
    const allTimeSlots = Array.from({ length: businessEndHour - businessStartHour }, 
      (_, i) => `${businessStartHour + i}:00`);
    
    // Check for existing events on that day
    const events = await calendar.events.list({
      calendarId: 'primary',
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });
    
    // Filter out time slots that overlap with existing events
    const bookedSlots = new Set();
    if (events.data.items && events.data.items.length > 0) {
      events.data.items.forEach(event => {
        if (event.start?.dateTime) {
          const eventStart = new Date(event.start.dateTime);
          const hour = eventStart.getHours();
          
          // Mark the slot as booked
          if (hour >= businessStartHour && hour < businessEndHour) {
            bookedSlots.add(`${hour}:00`);
          }
        }
      });
    }
    
    // Get available slots
    const availableSlots = allTimeSlots.filter(slot => !bookedSlots.has(slot));
    
    // Format slots in a user-friendly way (e.g., "10:00 AM")
    const formattedSlots = availableSlots.map(slot => {
      const [hourStr] = slot.split(':');
      const hour = parseInt(hourStr);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:00 ${ampm}`;
    });
    
    // Return available slots and the date requested
    return {
      date: dateObj.toISOString().split('T')[0], // YYYY-MM-DD format
      availableSlots: formattedSlots,
      formattedDate: dateObj.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      })
    };
  } catch (error: any) {
    console.error('[Calendar API] Error checking availability:', error.message);
    throw error;
  }
}

/**
 * Handler for POST requests to create calendar appointments
 */
export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    if (!data.appointmentDetails) {
      return NextResponse.json(
        { error: 'Missing appointment details' },
        { status: 400 }
      )
    }
    
    // Check if we have Google Calendar credentials
    if (!process.env.GOOGLE_CLIENT_ID || 
        !process.env.GOOGLE_CLIENT_SECRET || 
        !process.env.GOOGLE_REFRESH_TOKEN) {
      console.warn('[Calendar API] Missing Google Calendar credentials')
      return NextResponse.json({
        success: false,
        error: 'Calendar integration not configured',
        mockResponse: true,
        appointmentDetails: data.appointmentDetails
      })
    }
    
    // Create the calendar event
    const result = await createCalendarEvent(data.appointmentDetails)
    
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('[Calendar API] Request error:', error.message)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to process appointment request',
      details: error.message
    }, { status: 200 }) // Using 200 instead of 500 to prevent client-side errors
  }
}

/**
 * Handler for GET requests to check calendar availability
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    
    // Check if we have Google Calendar credentials
    const isConfigured = !!(
      process.env.GOOGLE_CLIENT_ID && 
      process.env.GOOGLE_CLIENT_SECRET && 
      process.env.GOOGLE_REFRESH_TOKEN
    );
    
    if (!isConfigured) {
      console.warn('[Calendar API] Missing Google Calendar credentials');
      return NextResponse.json({
        available: true,
        configured: false,
        // Generate mock data if not configured
        mockData: date ? {
          date: date,
          availableSlots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'],
          formattedDate: 'Tomorrow'  // Simplified mock data
        } : null
      });
    }
    
    // If a date is provided, check availability
    if (date) {
      try {
        const availability = await checkAvailability(date);
        return NextResponse.json({
          available: true,
          configured: true,
          ...availability
        });
      } catch (error: any) {
        return NextResponse.json({
          available: false,
          configured: true,
          error: error.message
        });
      }
    }
    
    // Default response if no date provided
    return NextResponse.json({
      available: true,
      configured: true
    });
  } catch (error: any) {
    console.error('[Calendar API] Error in GET request:', error.message);
    return NextResponse.json({
      available: false,
      error: error.message
    }, { status: 200 }); // Using 200 to prevent client-side errors
  }
} 