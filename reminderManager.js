import fs from 'fs/promises';
import path from 'path';

const REMINDERS_FILE = path.join(process.cwd(), 'reminders.json');

// Load and restore reminders on bot startup
export async function initializeReminders(client) {
    try {
        const data = await fs.readFile(REMINDERS_FILE, 'utf8');
        const reminders = JSON.parse(data);
        
        const activeReminders = [];
        const now = Date.now();
        
        for (const reminder of reminders) {
            const timeLeft = reminder.reminderTime - now;
            
            if (timeLeft > 0) {
                // Reminder is still pending, reschedule it
                setTimeout(async () => {
                    try {
                        const channel = await client.channels.fetch(reminder.channelId);
                        await channel.send({
                            content: `<@${reminder.userId}> 🔔 Reminder: ${reminder.text}`,
                            allowedMentions: { users: [reminder.userId] },
                        });
                    } catch (error) {
                        console.error('Error sending restored reminder:', error);
                    }
                    // Remove reminder after sending
                    await removeReminder(reminder.id);
                }, timeLeft);
                
                activeReminders.push(reminder);
                console.log(`Restored reminder for user ${reminder.userId}: "${reminder.text}" (${Math.round(timeLeft / 1000 / 60)} minutes left)`);
            }
        }
        
        // Save only active reminders back to file
        await fs.writeFile(REMINDERS_FILE, JSON.stringify(activeReminders, null, 2));
        
        console.log(`Restored ${activeReminders.length} active reminders`);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // File doesn't exist, create empty file
            await fs.writeFile(REMINDERS_FILE, JSON.stringify([], null, 2));
            console.log('Created new reminders file');
        } else {
            console.error('Error initializing reminders:', error);
        }
    }
}

// Helper function to remove reminder
async function removeReminder(reminderId) {
    try {
        const data = await fs.readFile(REMINDERS_FILE, 'utf8');
        const reminders = JSON.parse(data);
        const filtered = reminders.filter(r => r.id !== reminderId);
        await fs.writeFile(REMINDERS_FILE, JSON.stringify(filtered, null, 2));
    } catch (error) {
        console.error('Error removing reminder:', error);
    }
}