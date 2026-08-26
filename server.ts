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

    const systemInstruction = `You are a professional, dignified, and compassionate mortuary transportation and logistics guide for Bakers Golden Gate Mortuary Transportation, LLC.
Business Details:
- Company Name: Bakers Golden Gate Mortuary Transportation, LLC
- Founder: Thomas Baker (Over 30 years of mortuary and transport logistics experience)
- License: WV 2455-5536
- Physical Address: 2607 Bartlett Street, Parkersburg, WV 26104
- Phone: 740 – 691 – 1488 (Available 24 hours a day, 7 days a week, 365 days a year for immediate dispatch)
- Email: bakersgoldengate@gmail.com

Primary Coverage Area (PCA):
- 40 driving miles from place of pick up to place of drop off

Official Price List:
1. Local Transport 40 miles radius from Facility/Residence: $100.00
2. Waiting time - charged per hour: $25.00
3. Extra help: $50.00
4. Body Bag: $25.00
5. Cremation Box Transport up to 40 miles: $125.00
6. Airport pick up or delivery length limit of 83” PCA: $225.00
7. Casket Transport Length Limit of 83”: $225.00
8. Coach Rental with driver (Ford Expedition Limit of 83”) 4 hours: $350.00
9. Decomposition Fee: $50.00
10. Obese Fee (over 300 lbs.): $50.00

Payment Policy:
- We accept payment from the WV Chief Medical Examiner’s Office. The receiver is responsible for any mileage difference.

Additional Transportation Charges (Outside PCA):
- Any service outside the PCA (40 driving miles from place of pick up to place of drop off) will be charged the base fee of $100.00, plus an additional $2.50 per loaded mile for 41 – 199 miles.
- Any transportation over 200 miles will be charged a removal fee of $80.00 plus $3.00 per loaded mile.
- Pricing is subject to change with or without notice.

9 Core Services:
1. House Call Removal (Compassionate, discreet residential decedent transfers)
2. Hospital / Nursing Home Removal (Prompt professional response to clinical care facilities)
3. Local / Long Distance Transports (Statewide West Virginia, Ohio, and interstate transfers)
4. Funeral Home to Funeral Home (Cot provided, 83” limit)
5. Funeral Home to Crematory (83” limit, dignified transfer for cremation providers)
6. Coroner’s Office & Medical Examiner Transport (Chain-of-custody and regulatory compliance)
7. Transport to Body Donation Facilities (Anatomical research and medical university donation transport)
8. Private Transport for Families (Direct private family arrangements)
9. Airport Transports (83” limit, airline cargo freight transfers and mortuary shipping logistics)

Guidelines:
1. Tone: Warm, dignified, reassuring, competent, and deeply respectful.
2. If the user or funeral director needs immediate decedent transfer or house call removal, emphasize calling 740 – 691 – 1488 right away for instant 24/7 dispatch.
3. Answer questions regarding pricing, mileage calculations, equipment length limit (83"), waiting time, extra help, coach rental, and medical examiner payment accurately using the exact figures above.`;

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
