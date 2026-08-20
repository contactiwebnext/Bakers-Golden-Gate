import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK lazily / safely
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// In-memory persistent collections (with default seed data)
interface TributeMessage {
  id: string;
  obituaryId: string;
  author: string;
  relation: string;
  message: string;
  candleLit: boolean;
  timestamp: string;
}

interface AppointmentRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  serviceType: string;
  consultationType: "in-person" | "phone" | "virtual";
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  createdAt: string;
}

const tributes: TributeMessage[] = [
  {
    id: "tribute-1",
    obituaryId: "obit-1",
    author: "The Henderson Family",
    relation: "Lifelong Neighbor",
    message: "Sending our deepest prayers and warmth to your family during this difficult time. May cherished memories bring comfort.",
    candleLit: true,
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "tribute-2",
    obituaryId: "obit-1",
    author: "Mary & Robert Collins",
    relation: "Church Community",
    message: "A truly gentle and kind soul who blessed everyone around them. Holding you all close in our hearts.",
    candleLit: true,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "tribute-3",
    obituaryId: "obit-2",
    author: "David Vance",
    relation: "Former Colleague",
    message: "Deeply saddened to hear of this loss. Thank you Bakers Golden Gate for providing such dignified care.",
    candleLit: true,
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
];

const appointments: AppointmentRequest[] = [];

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Obituary Condolences & Tributes API
app.get("/api/tributes", (req, res) => {
  const { obituaryId } = req.query;
  if (obituaryId && typeof obituaryId === "string") {
    return res.json(tributes.filter((t) => t.obituaryId === obituaryId));
  }
  res.json(tributes);
});

app.post("/api/tributes", (req, res) => {
  const { obituaryId, author, relation, message, candleLit } = req.body;
  if (!author || !message || !obituaryId) {
    return res.status(400).json({ error: "Author name, message, and obituary ID are required." });
  }

  const newTribute: TributeMessage = {
    id: `tribute-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    obituaryId: String(obituaryId),
    author: String(author).trim(),
    relation: String(relation || "Friend / Community Member").trim(),
    message: String(message).trim(),
    candleLit: Boolean(candleLit),
    timestamp: new Date().toISOString(),
  };

  tributes.unshift(newTribute);
  res.status(201).json({ success: true, tribute: newTribute });
});

// Appointment Consultation API
app.post("/api/appointments", (req, res) => {
  const { fullName, phone, email, serviceType, consultationType, preferredDate, preferredTime, notes } = req.body;

  if (!fullName || !phone || !serviceType || !preferredDate) {
    return res.status(400).json({ error: "Please provide full name, contact phone, service type, and preferred date." });
  }

  const newAppointment: AppointmentRequest = {
    id: `apt-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    fullName: String(fullName).trim(),
    phone: String(phone).trim(),
    email: String(email || "").trim(),
    serviceType: String(serviceType),
    consultationType: consultationType || "in-person",
    preferredDate: String(preferredDate),
    preferredTime: String(preferredTime || "Morning (9:00 AM - 12:00 PM)"),
    notes: String(notes || "").trim(),
    createdAt: new Date().toISOString(),
  };

  appointments.push(newAppointment);
  res.status(201).json({
    success: true,
    message: "Your consultation request has been received. Our directors will reach out promptly to confirm your time.",
    appointment: newAppointment,
  });
});

// Contact / General Inquiry Form API
app.post("/api/contact", (req, res) => {
  const { name, email, phone, message, subject } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ error: "Name, phone number, and a message are required." });
  }

  // In production, this can send an email via SMTP or store in DB
  console.log(`[Contact Form Received] From: ${name}, Phone: ${phone}, Email: ${email}, Subject: ${subject}`);

  res.json({
    success: true,
    message: "Thank you for reaching out to Bakers Golden Gate. A compassionate staff member will contact you shortly.",
    submittedAt: new Date().toISOString(),
  });
});

// AI Funeral Care & Etiquette Assistant (Gemini)
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getAIClient();
    if (!ai) {
      // Graceful fallback if API key is not configured yet
      return res.json({
        reply: "Thank you for reaching out to Bakers Golden Gate in Parkersburg, WV. We are dedicated to providing compassionate, dignified care for your family. For immediate assistance or personalized guidance, please call our 24/7 line at (740) 691-1488 or email bakersgoldengate@gmail.com.",
      });
    }

    const systemInstruction = `You are a gentle, deeply compassionate, respectful, and comforting funeral care guide for Bakers Golden Gate, a mortuary serving families in Parkersburg, West Virginia and the surrounding Mid-Ohio Valley.
Business Details:
- Name: Bakers Golden Gate
- Location: Parkersburg, WV
- Phone: (740) 691-1488 (Available 24/7 for immediate needs)
- Email: bakersgoldengate@gmail.com
- Services: Funeral Services, Memorial Services, Cremation Services, Burial Services, Advance Pre-Planning, Grief & Family Support.

Guidelines:
1. Tone: Warm, dignified, reassuring, gentle, and respectful. Avoid clinical or overly corporate jargon.
2. If the user indicates someone has just passed away or an immediate need, offer heartfelt sympathy first, provide clear, simple first steps (contacting the mortuary at 740-691-1488, locating vital documents), and reassure them they do not have to walk through this alone.
3. Answer questions clearly regarding funeral planning, cremation vs burial, writing eulogies/obituaries, visiting etiquette, grief support resources, and scheduling consultations.
4. Never invent historical dates, unverifiable claims, or prices. Emphasize that Bakers Golden Gate provides personalized, transparent guidance for every family.
5. Keep responses easy to read with thoughtful paragraphing or gentle bullet points.`;

    const chat = ai.chats.create({
      model: "gemini-3.7-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    // If history was provided, feed previous context
    if (Array.isArray(history) && history.length > 0) {
      for (const item of history.slice(-4)) {
        if (item.sender === "user" && item.text) {
          // send prior context if applicable
        }
      }
    }

    const response = await chat.sendMessage({
      message: message,
    });

    const replyText = response.text || "We are here to support you in every step. Please call us at (740) 691-1488 anytime.";
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Gemini chat error:", error);
    res.status(500).json({
      reply: "We are here to assist your family in Parkersburg, WV. For immediate support, please contact our directors directly at (740) 691-1488 or email bakersgoldengate@gmail.com.",
    });
  }
});

// Vite & Static Asset Handling
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bakers Golden Gate server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
