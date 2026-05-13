import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const bookingCreateSchema = z.object({
  userName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  address: z.string().optional(),
  packageId: z.string().min(1),
  bookingDate: z.string().min(1),
});

export const bookingUpdateSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]).optional(),
  paymentStatus: z.enum(["PENDING", "PAID", "REFUNDED"]).optional(),
  userName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(6).optional(),
  address: z.string().optional(),
  bookingDate: z.string().optional(),
});

export const packageCreateSchema = z.object({
  title: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i, "Slug: lowercase letters, numbers, hyphens"),
  description: z.string().min(1),
  price: z.number().nonnegative(),
  duration: z.string().min(1),
  panditName: z.string().min(1),
  image: z.string().optional().nullable(),
  category: z.enum(["PUJA", "HAVAN"]),
  isFeatured: z.boolean().optional(),
});

export const messageCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(1),
});

export const galleryCreateSchema = z.object({
  type: z.enum(["IMAGE", "VIDEO"]),
  title: z.string().min(1),
  fileUrl: z.string().min(1),
});

export const donationCreateSchema = z.object({
  donorName: z.string().min(1),
  amount: z.number().positive(),
  paymentId: z.string().optional(),
});

export const contactSettingsSchema = z.object({
  templeName: z.string().min(1),
  address: z.string().min(1),
  phone1: z.string().min(1),
  phone2: z.string().optional().nullable(),
  whatsapp: z.string().optional().nullable(),
  email: z.string().email(),
  googleMapLink: z.string().optional().nullable(),
});

export const socialSettingsSchema = z.object({
  instagram: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  youtube: z.string().optional().nullable(),
  whatsapp: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
});

export const websiteSettingsSchema = z.object({
  heroTitle: z.string().min(1),
  heroSubtitle: z.string().min(1),
  footerText: z.string().min(1),
  logo: z.string().optional().nullable(),
});
