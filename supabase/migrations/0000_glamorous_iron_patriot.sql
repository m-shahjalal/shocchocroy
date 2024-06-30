CREATE TABLE IF NOT EXISTS "attachment" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"attachment" varchar,
	"attach_id" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_attribute" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"key" varchar(255) NOT NULL,
	"value" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"description" varchar,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp,
	"delete_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "discount" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"description" varchar,
	"discount_percent" varchar,
	"is_active" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" varchar(63),
	"updated_by" varchar(63),
	"deleted_by" varchar(63)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_sku" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"product_id" varchar NOT NULL,
	"sku" varchar(63) NOT NULL,
	"price" varchar(15) NOT NULL,
	"quantity" varchar(10) NOT NULL,
	"size_attribute" varchar(63) NOT NULL,
	"color_attribute" varchar(63) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar NOT NULL,
	"cover_image" varchar(255),
	"product_id" varchar(63) NOT NULL,
	"category_id" varchar(63) NOT NULL,
	"discount_id" varchar(63) NOT NULL,
	"price" double precision NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" varchar NOT NULL,
	"updated_by" varchar,
	"deleted_by" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sub_category" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar,
	"parent_id" varchar(63)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cart_item" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"session_id" varchar(63) NOT NULL,
	"product_id" varchar(63) NOT NULL,
	"quantity" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_details" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(63),
	"payment_id" varchar(63),
	"total" double precision,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_item" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"product_id" varchar(63) NOT NULL,
	"order_id" varchar(63) NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shopping_session" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"total_price" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(63),
	"address1" varchar NOT NULL,
	"address2" varchar,
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"zip_code" varchar(255) NOT NULL,
	"country" varchar(255) DEFAULT 'bd' NOT NULL,
	"primary_address" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin_type" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"type" varchar(633),
	"permission" varchar(633),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"username" varchar(255),
	"password" varchar(511),
	"name" varchar(255),
	"email" varchar(255),
	"type_id" varchar(63),
	"is_active" boolean DEFAULT true,
	"last_login" timestamp,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment-method" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"payment_type" varchar(63) NOT NULL,
	"provider" varchar(63) NOT NULL,
	"account_number" varchar(63) NOT NULL,
	"default" boolean DEFAULT true,
	"expiry" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"username" varchar(255),
	"email" varchar(255),
	"password" varchar,
	"is_active" boolean,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp
);
