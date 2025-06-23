/**
 * Reset all view counts in Upstash Redis
 * 
 * Run this script with:
 * node scripts/reset-views.mjs
 * 
 * To check view counts in browser:
 * http://localhost:3000/api/posts/[slug]/views
 */

import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.development.local' });

const redis = Redis.fromEnv();

async function resetDatabase() {
  try {
    // Get all keys
    const keys = await redis.keys("*");
    
    // Delete all keys if any exist
    if (keys.length > 0) {
      await redis.del(...keys);
      console.log(`✅ Deleted ${keys.length} keys`);
    } else {
      console.log("📭 No keys found to delete");
    }
  } catch (error) {
    console.error("❌ Error resetting database:", error);
  }
}

// Call the function
await resetDatabase();