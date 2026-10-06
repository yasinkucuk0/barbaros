/*
  Warnings:

  - A unique constraint covering the columns `[barber,date,time]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Appointment_barber_date_time_key" ON "Appointment"("barber", "date", "time");
