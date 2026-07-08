# reno-notice-board

# Install packages (first time only)
npm install

# Generate Prisma Client
npx prisma generate

# Apply schema changes
npx prisma db push

# Start the application
npm run dev

# Open Prisma Studio
npx prisma studio