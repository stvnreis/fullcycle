CREATE TABLE IF NOT EXISTS "customer" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar,
	"cpf" varchar(11),
	"country" varchar,
	"state" varchar,
	"city" varchar,
	"street" varchar,
	"number" integer,
	"complement" varchar,
	"zip_code" varchar,
	"reward_points" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar,
	"value" double precision
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order" (
	"id" varchar PRIMARY KEY NOT NULL,
	"customer_id" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_item" (
	"id" varchar PRIMARY KEY NOT NULL,
	"order_id" varchar,
	"product_id" varchar,
	"quantity" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_item" ADD CONSTRAINT "order_item_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
