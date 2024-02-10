-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "companyId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "resume" TEXT,
    "objectives" TEXT,
    "total_time" INTEGER NOT NULL,
    "recurses" TEXT NOT NULL,
    "pdf_file_url" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ability" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "resume" TEXT,
    "objectives" TEXT,

    CONSTRAINT "Ability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guide" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ActivityToGuide" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_activity_list" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AbilityToActivity" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_cnpj_key" ON "Company"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityToGuide_AB_unique" ON "_ActivityToGuide"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityToGuide_B_index" ON "_ActivityToGuide"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_activity_list_AB_unique" ON "_activity_list"("A", "B");

-- CreateIndex
CREATE INDEX "_activity_list_B_index" ON "_activity_list"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AbilityToActivity_AB_unique" ON "_AbilityToActivity"("A", "B");

-- CreateIndex
CREATE INDEX "_AbilityToActivity_B_index" ON "_AbilityToActivity"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityToGuide" ADD CONSTRAINT "_ActivityToGuide_A_fkey" FOREIGN KEY ("A") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityToGuide" ADD CONSTRAINT "_ActivityToGuide_B_fkey" FOREIGN KEY ("B") REFERENCES "Guide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_activity_list" ADD CONSTRAINT "_activity_list_A_fkey" FOREIGN KEY ("A") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_activity_list" ADD CONSTRAINT "_activity_list_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AbilityToActivity" ADD CONSTRAINT "_AbilityToActivity_A_fkey" FOREIGN KEY ("A") REFERENCES "Ability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AbilityToActivity" ADD CONSTRAINT "_AbilityToActivity_B_fkey" FOREIGN KEY ("B") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
