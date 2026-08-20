import { ServiceCategory, Obituary, GriefArticle } from '../types';

export const BUSINESS_INFO = {
  name: 'Bakers Golden Gate',
  tagline: 'Compassionate Care When Your Family Needs It Most',
  location: 'Parkersburg, WV',
  fullLocationName: 'Parkersburg, West Virginia & the Mid-Ohio Valley',
  phone: '740-691-1488',
  phoneClean: '+17406911488',
  email: 'bakersgoldengate@gmail.com',
  hours: 'Available 24 Hours a Day, 7 Days a Week for Immediate Family Need',
  officeHours: 'Monday – Friday: 9:00 AM – 5:00 PM | Saturday & Sunday: By Appointment & 24/7 On-Call Support',
  addressNote: 'Serving families throughout Parkersburg, Wood County, and surrounding Ohio & West Virginia communities. For private family consultations and address directions, please call us.',
};

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: 'funeral-services',
    title: 'Funeral Services',
    subtitle: 'Honoring a unique life with dignity & reverence',
    description: 'Traditional and contemporary funeral services designed to bring family and friends together in remembrance, reflection, and mutual support.',
    iconName: 'HeartHandshake',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    features: [
      'Traditional visitation & viewing arrangements',
      'Personalized celebration of life ceremonies',
      'Clergy and officiant coordination',
      'Customized memorial stationery & memory folders',
      'Hearse and funeral cortege transport',
    ],
    detailedOverview:
      'A traditional funeral service offers a meaningful bridge between grief and healing. At Bakers Golden Gate, we walk alongside you to curate a service that faithfully reflects the beliefs, character, and legacy of your loved one, providing a sacred space for shared tears and comforting memories.',
    whatsIncluded: [
      'Comprehensive administrative and director guidance',
      'Coordinating with cemetery, church, or venue',
      'Preparation, dressing, and dignified care of your loved one',
      'Music, floral arrangement coordination, and tribute tribute displays',
      'Support throughout the entire visitation and service process',
    ],
  },
  {
    id: 'memorial-services',
    title: 'Memorial Services',
    subtitle: 'Personalized gatherings celebrating a cherished story',
    description: 'Flexible, deeply meaningful memorial gatherings held with or without the presence of remains, tailored to your family’s timing and preferences.',
    iconName: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=800&q=80',
    features: [
      'Ceremonies held at our facility, place of worship, or outdoor venue',
      'Custom photo & video tribute presentations',
      'Personal keepsake & memory table setups',
      'Flexible scheduling to accommodate traveling family',
      'Music, reading, and personal sharing coordination',
    ],
    detailedOverview:
      'Memorial services provide immense flexibility, allowing families to celebrate their loved one’s life weeks or even months after passing. Whether intimate or expansive, we ensure every detail resonates with warmth and dignity.',
    whatsIncluded: [
      'Arrangement consultation and order-of-service design',
      'Audio-visual setup for tribute videos and acoustic music',
      'Memorial register book, prayer cards, and thank-you stationery',
      'Personalized memory display stands and keepsake easels',
      'Director attendance and on-site hospitality coordination',
    ],
  },
  {
    id: 'cremation-services',
    title: 'Cremation Services',
    subtitle: 'Respectful, transparent care with dignified options',
    description: 'Comprehensive cremation offerings ranging from simple direct cremation to complete services with visitation and memorial gatherings.',
    iconName: 'Flame',
    imageUrl: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80',
    features: [
      'Direct cremation with strict chain-of-custody oversight',
      'Cremation with prior traditional viewing & visitation',
      'Memorial service with urn present',
      'Wide selection of dignified urns and keepsake jewelry',
      'Guidance on scattering, columbarium placement, or burial',
    ],
    detailedOverview:
      'Cremation is a personal choice that accommodates diverse memorial traditions. Bakers Golden Gate upholds the highest ethical standards of care, ensuring peace of mind, reverence, and full transparency for your family.',
    whatsIncluded: [
      'Securing death certificates and all required medical permits',
      'Dignified transfer into our care',
      'Eco-conscious and traditional urn options',
      'Keepsake urns and remembrance fingerprint jewelry options',
      'Cremated remains return in accordance with family wishes',
    ],
  },
  {
    id: 'burial-services',
    title: 'Burial Services',
    subtitle: 'Timeless final resting place arrangements',
    description: 'Ground burial, mausoleum entombment, and graveside committal services conducted with gentle reverence in local Parkersburg and regional cemeteries.',
    iconName: 'Compass',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    features: [
      'Graveside committal rites with tent and seating arrangement',
      'Casket selection guidance with dignified materials',
      'Burial vault and outer container coordination',
      'Perpetual cemetery liaison and plot logistics',
      'Honor military veteran honors and folding of the flag',
    ],
    detailedOverview:
      'Ground burial provides a permanent, physical sanctuary where generations can return to remember and feel close to their loved one. We handle all cemetery coordination with precision and care.',
    whatsIncluded: [
      'Professional cemetery liaison and scheduling',
      'Dignified hearse transportation to the resting place',
      'Graveside setup with canopy tent, turf, and lowering device',
      'Military honors coordination for eligible service members',
      'Assistance with monument or memorial marker selection',
    ],
  },
  {
    id: 'pre-planning',
    title: 'Pre-Planning Arrangements',
    subtitle: 'Gift of peace of mind for your loved ones',
    description: 'Take control of your future wishes and relieve emotional and financial burdens from your family by recording arrangements in advance.',
    iconName: 'FileCheck',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    features: [
      'No-obligation planning consultation',
      'Detailed documentation of personal service preferences',
      'Flexible pre-funding and guaranteed options',
      'Protecting loved ones from hurried decisions during grief',
      'Transferable pre-need policy consultations',
    ],
    detailedOverview:
      'Pre-planning is one of the most thoughtful gifts you can give your family. By making your preferences known ahead of time, your loved ones can focus on healing rather than second-guessing difficult decisions.',
    whatsIncluded: [
      'Personal Wishes Organizer and Vital Statistics record',
      'Itemized transparent cost breakdown',
      'Secure record archiving at Bakers Golden Gate',
      'Periodic review options as life circumstances evolve',
      'Informative family consultation packet to keep at home',
    ],
  },
  {
    id: 'grief-support',
    title: 'Grief & Family Support',
    subtitle: 'Continuing care long after the service concludes',
    description: 'Grief does not end when the service is over. We offer compassionate aftercare guidance, community resources, and empathetic support for the journey ahead.',
    iconName: 'ShieldHeart',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    features: [
      'Recommended local Mid-Ohio Valley grief counseling referrals',
      'Literature and guides for navigating grief stages',
      'Specialized support for children, teens, and surviving spouses',
      'Guidance for navigating holidays and anniversaries after loss',
      'Ongoing compassionate availability whenever you need someone to talk to',
    ],
    detailedOverview:
      'Our commitment to your family extends well beyond the final tribute. We are dedicated to offering ongoing reassurance, literature, and connections to local support networks to help you find footing during bereavement.',
    whatsIncluded: [
      'Complimentary grief support handbook and reading materials',
      'Aftercare checklist for settling estate and document matters',
      'Annual remembrance service invitations',
      'Direct referrals to specialized bereavement counselors in WV & OH',
      'Compassionate listening and guidance whenever you call',
    ],
  },
];

export const OBITUARIES_DATA: Obituary[] = [
  {
    id: 'obit-1',
    fullName: 'Eleanor Mae Sterling',
    years: '1942 – 2026',
    birthDate: 'August 14, 1942',
    passingDate: 'February 12, 2026',
    serviceDateLocation: 'Saturday, February 21, 2026 at 11:00 AM • Parkersburg, WV',
    summary: 'Devoted mother, retired Wood County educator, and avid gardener whose warmth and generous heart touched generations across the Mid-Ohio Valley.',
    fullObituary:
      'Eleanor Mae Sterling, age 83, of Parkersburg, West Virginia, gently entered into eternal rest on February 12, 2026, surrounded by the love of her family. Born in Parkersburg, Eleanor spent over three decades teaching elementary education, inspiring countless young minds with her patient kindness.\n\nShe was an active member of her church choir, found immense joy in cultivating roses in her garden, and took greatest pride in watching her grandchildren grow. She is survived by her two children, four grandchildren, and a wide circle of dear friends who will forever remember her graceful spirit.\n\nArrangements are in the dignified care of Bakers Golden Gate. Memorial contributions may be made in Eleanor’s honor to the Parkersburg Community Foundation for Literacy.',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    serviceType: 'Funeral & Celebration of Life',
    virtualCandlesCount: 42,
  },
  {
    id: 'obit-2',
    fullName: 'James "Jim" Arthur Harrison',
    years: '1950 – 2026',
    birthDate: 'March 22, 1950',
    passingDate: 'February 5, 2026',
    serviceDateLocation: 'Private Family Memorial Service • Parkersburg, WV',
    summary: 'Honorable veteran, skilled woodworker, and cherished grandfather known for his quick wit, deep integrity, and unwavering dedication to his family.',
    fullObituary:
      'James "Jim" Arthur Harrison, age 75, of Parkersburg, WV, passed away peacefully on February 5, 2026. Having proudly served in the United States military, Jim brought discipline, quiet strength, and craftsmanship to all his endeavors.\n\nJim was known throughout the neighborhood for his bespoke oak birdhouses and his readiness to lend a helping hand to anyone in need. He leaves behind his beloved wife of 51 years, Martha, three children, and six grandchildren who will miss his fireside stories.\n\nThe Harrison family extends heartfelt gratitude to Bakers Golden Gate for their tender and respectful assistance during this time of remembrance.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    serviceType: 'Memorial Service & Military Honors',
    virtualCandlesCount: 38,
  },
  {
    id: 'obit-3',
    fullName: 'Clara Belle Jenkins',
    years: '1938 – 2026',
    birthDate: 'November 3, 1938',
    passingDate: 'January 28, 2026',
    serviceDateLocation: 'Graveside Committal Service • Wood County Memorial Grounds',
    summary: 'Beloved matriarch, gifted quilter, and steadfast friend whose radiant smile and homemade pies brought joy to every family gathering.',
    fullObituary:
      'Clara Belle Jenkins, age 87, of Parkersburg, West Virginia, passed away with serene peace on January 28, 2026. Clara lived a full and vibrant life centered on faith, family, and hospitality. Every grandchild received a handmade quilt stitched with unconditional love.\n\nShe is survived by her devoted sisters, children, ten great-grandchildren, and many nieces and nephews. Committal services will be conducted with gentle reverence under the direction of Bakers Golden Gate.',
    imageUrl: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80',
    serviceType: 'Graveside Burial & Prayer Service',
    virtualCandlesCount: 56,
  },
];

export const GRIEF_ARTICLES: GriefArticle[] = [
  {
    id: 'first-48-hours',
    title: 'What to Do in the First 48 Hours: A Gentle Checklist',
    readTime: '4 min read',
    category: 'Immediate Steps',
    summary: 'Clear, step-by-step guidance on who to notify, what documents to gather, and how Bakers Golden Gate assists you immediately.',
    content: [
      '1. Contact the Attending Medical Professional or Hospice / Emergency Services to verify the legal declaration of passing.',
      '2. Call Bakers Golden Gate at 740-691-1488. We are available day and night to bring your loved one gently into our care.',
      '3. Notify immediate family members and close confidants so you have a support circle around you.',
      '4. Locate important documents: Social Security number, birth certificate, veteran discharge papers (DD-214 if applicable), and any existing pre-arrangement wishes.',
      '5. Remember to breathe and take one moment at a time. You do not have to make every decision at once.',
    ],
  },
  {
    id: 'navigating-grief',
    title: 'Understanding the Waves of Bereavement',
    readTime: '5 min read',
    category: 'Healing & Coping',
    summary: 'Grief is not a linear ladder, but an ebb and flow. Learn practical ways to give yourself grace during this tender season.',
    content: [
      'Grief touches every part of our being: emotional, mental, and physical. Feeling fatigued, forgetful, or overwhelmed is completely natural.',
      'Allow yourself to feel whatever arises without judgment—whether tears, numbness, or even moments of quiet laughter remembering good times.',
      'Establish small daily routines: drinking plenty of water, stepping into fresh morning air, and resting when your body requests it.',
      'Reach out when the silence feels heavy. Lean on trusted friends, family, faith leaders, or bereavement support groups in the Parkersburg area.',
    ],
  },
  {
    id: 'supporting-children',
    title: 'Helping Children and Teens Navigate Loss',
    readTime: '6 min read',
    category: 'Family Guidance',
    summary: 'How to use honest, age-appropriate language, answer difficult questions, and include younger family members in meaningful farewells.',
    content: [
      'Use simple, concrete language. Avoid confusing euphemisms like "went to sleep," which can foster fears around bedtime for young children.',
      'Reassure children that their feelings—whether anger, sadness, or confusion—are safe and valid.',
      'Invite children to participate in memorials in ways they feel comfortable with (e.g., drawing a picture, placing a flower, or choosing a favorite song).',
      'Maintain reassuring consistency in school and family routines while providing extra hugs and listening ears.',
    ],
  },
];

export const FAQS = [
  {
    question: 'What should we do immediately when a loved one passes away at home or hospital?',
    answer:
      'If the passing was anticipated and under hospice care, contact the hospice nurse first; they will initiate the legal pronouncement and call our directors. If unexpected, call 911. Once medical professionals have completed their protocols, call Bakers Golden Gate at 740-691-1488. We will coordinate transport into our gentle care immediately.',
  },
  {
    question: 'Are your directors available 24 hours a day in Parkersburg?',
    answer:
      'Yes. Loss does not observe business hours. A dedicated, compassionate staff member at Bakers Golden Gate is on-call 24 hours a day, 7 days a week, 365 days a year to answer your calls and respond to your family’s urgent needs.',
  },
  {
    question: 'Can we personalize a memorial or funeral service to reflect our loved one’s unique life?',
    answer:
      'Absolutely. Every life is singular and deserve a tribute that honors their passions, faith, achievements, and family bonds. From favorite musical selections and photo slideshows to memory tables and personalized programs, we assist you in creating a meaningful farewell.',
  },
  {
    question: 'What is the benefit of pre-planning funeral or cremation arrangements?',
    answer:
      'Pre-planning relieves your surviving family members of having to make dozens of emotionally difficult decisions during their deepest grief. It guarantees your personal wishes are honored and provides immense peace of mind.',
  },
  {
    question: 'How do I obtain certified copies of the death certificate in West Virginia?',
    answer:
      'Bakers Golden Gate assists your family in filing the necessary vital records and ordering the exact number of certified death certificates needed for estates, insurance, banking, and legal transitions.',
  },
];
