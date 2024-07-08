ALTER TABLE "product" RENAME COLUMN "size_attribute" TO "size";--> statement-breakpoint
ALTER TABLE "product" RENAME COLUMN "color_attribute" TO "color";--> statement-breakpoint
ALTER TABLE "product" RENAME COLUMN "quantity" TO "stock";--> statement-breakpoint
ALTER TABLE "sub_category" RENAME COLUMN "product_id" TO "slug";--> statement-breakpoint
ALTER TABLE "product" DROP CONSTRAINT "product_size_attribute_product_attribute_id_fk";
--> statement-breakpoint
ALTER TABLE "product" DROP CONSTRAINT "product_color_attribute_product_attribute_id_fk";
--> statement-breakpoint
ALTER TABLE "sub_category" DROP CONSTRAINT "sub_category_product_id_product_id_fk";
--> statement-breakpoint
ALTER TABLE "attachment" ALTER COLUMN "attachment" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "attachment" ALTER COLUMN "attach_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "discount" ALTER COLUMN "discount_percent" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "discount_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "size" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "color" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "sub_category" ALTER COLUMN "parent_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sub_category" ALTER COLUMN "slug" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "sub_category" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "category" ADD COLUMN "slug" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "sub_category_id" varchar(63) NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_sub_category_id_sub_category_id_fk" FOREIGN KEY ("sub_category_id") REFERENCES "public"."sub_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
