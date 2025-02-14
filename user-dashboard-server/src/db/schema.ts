import {
  boolean,
  pgTable,
  varchar,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/** In the user table I did not add tokens to the store because if we use JWT 
 for authentication, the main purpose of it is stateless authentication, and if 
 we compare tokens from the database every time we are not using the full 
 functionality of JWT, instead if I create the access token and refresh 
 token when user use any restricted path then refresh token generates a new 
 token and by setting expiry time of access token if a user frequently uses 
 website no need to sign in every time and if for a very long period the 
 user is not using the website, then sign in compulsory. */
// If you think this approach isn't right, I will change the schema
// and adding a token. Let me know.

export const usersTable = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  first_name: varchar({ length: 255 }).notNull(),
  last_name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  content: text(),
  user_image: varchar(),
  background_image: varchar(),
  instagram_url: varchar(),
  facebook_url: varchar(),
  is_active: boolean().default(true),
  registered_at: timestamp().defaultNow(),
  updated_at: timestamp(),
  deleted_at: timestamp(),
});

export const postsTable = pgTable("posts", {
  id: uuid().defaultRandom().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  user_id: uuid().references(() => usersTable.id, { onDelete: "cascade" }),
  is_deleted: boolean().default(false),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp(),
  deleted_at: timestamp(),
});

export const commentsTable = pgTable("comments", {
  id: uuid().defaultRandom().primaryKey(),
  user_id: uuid().references(() => usersTable.id, { onDelete: "cascade" }),
  post_id: uuid().references(() => postsTable.id, { onDelete: "cascade" }),
  content: text().notNull(),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp(),
});

export const interactionsTable = pgTable("interactions", {
  id: uuid().defaultRandom().primaryKey(),
  user_id: uuid().references(() => usersTable.id, { onDelete: "cascade" }),
  post_id: uuid().references(() => postsTable.id, { onDelete: "cascade" }),
  liked: boolean(),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  comments: many(commentsTable),
  interactions: many(interactionsTable),
  posts: many(postsTable),
}));

export const postsRelations = relations(postsTable, ({ one, many }) => ({
  author: one(usersTable, {
    fields: [postsTable.user_id],
    references: [usersTable.id],
  }),
  comments: many(commentsTable),
  interactions: many(interactionsTable),
}));

export const commentsRelations = relations(commentsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [commentsTable.user_id],
    references: [usersTable.id],
  }),
  post: one(postsTable, {
    fields: [commentsTable.post_id],
    references: [postsTable.id],
  }),
}));

export const interactionsRelations = relations(
  interactionsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [interactionsTable.user_id],
      references: [usersTable.id],
    }),
    post: one(postsTable, {
      fields: [interactionsTable.post_id],
      references: [postsTable.id],
    }),
  })
);
