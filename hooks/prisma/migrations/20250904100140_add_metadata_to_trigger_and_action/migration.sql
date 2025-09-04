-- AlterTable
ALTER TABLE "public"."Action" ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE "public"."Trigger" ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}';
