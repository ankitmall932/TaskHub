-- CreateTable
CREATE TABLE "device_login" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "device_login_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "device_login_sessionId_key" ON "device_login"("sessionId");

-- CreateIndex
CREATE INDEX "device_login_userId_createdAt_idx" ON "device_login"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "device_login" ADD CONSTRAINT "device_login_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
