-- CreateTable
CREATE TABLE "public"."ShortVideos" (
    "id" SERIAL NOT NULL,
    "video" TEXT,
    "videoPublicId" TEXT,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShortVideos_pkey" PRIMARY KEY ("id")
);
