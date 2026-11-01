import {
  Building2,
  Milestone,
  Palette,
  ChefHat,
  FileCheck2,
  CarFront,
  Plane,
  Compass,
  Hammer,
  Layers,
} from "lucide-react";

import buildingImg from "../assets/services/building-contractor.jpg";
import roadImg from "../assets/services/road-contractor.jpg";
import interiorImg from "../assets/services/interior-designers.jpg";
import kitchenImg from "../assets/services/modular-kitchen.jpg";
import localPermitImg from "../assets/services/local-permits.jpg";
import nhaiPermitImg from "../assets/services/nhai-access-permit.jpg";
import airportNocImg from "../assets/services/airport-noc.jpg";
import gpsSurveyImg from "../assets/services/gps-surveying.jpg";
import renovationImg from "../assets/services/renovation-contractor.jpg";
import visualization3dImg from "../assets/services/3d-visualization.jpg";

export const services = [
  {
    number: "01",
    title: "Building Contractor",
    category: "Construction",
    icon: Building2,
    image: buildingImg,
    description:
      "Comprehensive construction solutions for residential, commercial, and industrial structures with uncompromised quality and structural integrity.",
    details:
      "We have over 12 years of experience in civil engineering and construction. Based in Kannur, we build strong, safe, and high-quality buildings. Led by a qualified civil engineer, we focus on good planning, proper management, and on-time project completion.\n\nWe have successfully completed important projects, including Mother and Child Hospital and Sree Narayana College Indoor Stadium. We follow Indian construction standards and maintain quality at every stage.\n\nOur goal is to build durable and reliable structures that last for generations.",
    deliverables: [
      "Turnkey RCC framing & civil structural contracting",
      "Over 12 years of verified civil engineering leadership",
      "Strict compliance with Indian construction & safety standards",
    ],
  },
  {
    number: "02",
    title: "Road Contractor",
    category: "Construction",
    icon: Milestone,
    image: roadImg,
    description:
      "High-grade asphalt paving, highway development, stormwater drainage networks, and civil transport infrastructure solutions.",
    details:
      "With over 30 years of experience in road construction, we provide strong and long-lasting road solutions for homes, industries, and businesses. Our expert civil engineers carefully plan every project and ensure quality work.\n\nWe offer bitumen tarring and concrete road paving to create smooth, safe, and durable roads. Our goal is to deliver reliable roads that last for many years. Contact Onset Infra to discuss your road construction needs.",
    deliverables: [
      "30+ years of expertise in road construction & paving",
      "High-grade bitumen tarring & concrete paving",
      "Long-lasting, safe infrastructure for homes & businesses",
    ],
  },
  {
    number: "03",
    title: "Interior Designers",
    category: "Interiors",
    icon: Palette,
    image: interiorImg,
    description:
      "Bespoke interior design, spatial planning, custom furniture, ambient lighting, and elegant finishes for homes and commercial spaces.",
    details:
      "With 12 years of experience, we provide complete interior design services for modern homes. Our team creates beautiful and comfortable spaces based on your needs and style.\n\nWe design and build custom furniture, cabinets, and storage units using quality materials like wood, plywood, multiwood, and WPC. We also provide POP work and modern false ceiling designs to give your home a beautiful finish. Our goal is to make every space stylish, comfortable, and practical.",
    deliverables: [
      "Custom furniture, cabinets & smart storage units",
      "Premium materials: wood, plywood, multiwood & WPC",
      "POP work, modern false ceiling designs & elegant lighting",
    ],
  },
  {
    number: "04",
    title: "Modular Kitchen",
    category: "Interiors",
    icon: ChefHat,
    image: kitchenImg,
    description:
      "Customized, ergonomic modular kitchen layouts with smart storage, premium hardware, durable countertops, and modern aesthetics.",
    details:
      "We design and build modern modular kitchens that make cooking easy and comfortable. Our kitchens are made to suit your space and needs, with smart storage and quality materials. We focus on creating clean, stylish, and well-organized kitchens that are easy to maintain and last for years.",
    deliverables: [
      "Customized ergonomic layouts tailored to your space",
      "Smart storage solutions & premium hardware",
      "Durable, easy-to-maintain & moisture-resistant finishes",
    ],
  },
  {
    number: "05",
    title: "Permit from Local Bodies",
    category: "Permits & Approvals",
    icon: FileCheck2,
    image: localPermitImg,
    description:
      "Comprehensive liaison and statutory approvals from Municipal Corporations, Panchayats, and Town Planning authorities.",
    details:
      "Getting building permits and approvals can be difficult, but we make the process simple. We help you get approvals from Panchayats, Municipalities, and Corporations for residential and commercial buildings.\n\nFrom preparing documents to getting the final occupancy certificate, we handle the entire process and make it easy and hassle-free.",
    deliverables: [
      "Sanction approvals from Panchayats, Municipalities & Corporations",
      "Complete statutory document & architectural drawing preparation",
      "Hassle-free liaison up to final occupancy certificate",
    ],
  },
  {
    number: "06",
    title: "Permit from NHAI",
    category: "Permits & Approvals",
    icon: CarFront,
    image: nhaiPermitImg,
    description:
      "Statutory NHAI access permissions, highway intersection geometry drawings, and approvals for commercial outlets and fuel stations.",
    details:
      "We help you get access permits from the National Highways Authority of India (NHAI) for properties near highways. Our team handles the required documents, applications, and approval process. We make it easier to get the necessary permission so your construction project can move forward without delays.",
    deliverables: [
      "Official NHAI highway access permit approvals",
      "Required technical drawings, applications & documentation",
      "End-to-end liaison to prevent construction delays",
    ],
  },
  {
    number: "07",
    title: "Airport NOC",
    category: "Permits & Approvals",
    icon: Plane,
    image: airportNocImg,
    description:
      "Statutory Airport Authority (AAI) NOC clearance, NOCAS height approvals, and Obstacle Limitation Surface (OLS) safety compliance.",
    details:
      "Navigating airport regulations and aviation guidelines for construction near flight paths and aerodromes can be complex. We provide comprehensive consultancy and statutory liaison to secure official No Objection Certificates (NOC) from the Airports Authority of India (AAI) through the NOCAS portal.\n\nFrom site elevation checks and obstacle limitation surface (OLS) compliance to complete document submission and follow-ups, we ensure your building complies with all civil aviation safety standards without project delays.",
    deliverables: [
      "End-to-end AAI NOCAS airport height clearances & sanctions",
      "Obstacle Limitation Surface (OLS) compliance & elevation verification",
      "Complete statutory documentation and liaison with airport authorities",
    ],
  },
  {
    number: "08",
    title: "GPS Surveying",
    category: "Permits & Approvals",
    icon: Compass,
    image: gpsSurveyImg,
    description:
      "High-precision DGPS and GPS topographical land surveys, boundary demarcation, contour leveling, and geo-referenced coordinate mapping.",
    details:
      "Accurate spatial measurements and topographical data are critical for modern civil engineering, infrastructure planning, and statutory submissions. We offer advanced GPS and Differential GPS (DGPS) land surveying with millimeter-level accuracy.\n\nOur experienced surveying team conducts complete contour mapping, boundary fixing, site leveling, and geo-referenced coordinates mapping. We deliver high-precision CAD drawings and survey reports essential for construction layout, revenue certification, and statutory approvals.",
    deliverables: [
      "High-precision DGPS & GPS topographical surveys and contour mapping",
      "Precise boundary demarcation & geo-referenced coordinate fixing",
      "CAD-ready survey datasets for engineering designs & statutory permits",
    ],
  },
  {
    number: "09",
    title: "Renovation Contractor",
    category: "Construction",
    icon: Hammer,
    image: renovationImg,
    description:
      "Turnkey remodeling, architectural restorations, structural upgrades, and complete modernization of existing residential and commercial properties.",
    details:
      "We provide complete renovation and remodeling services for old homes and commercial buildings. We improve your spaces with modern designs, better facilities, and quality work. From bathroom and toilet renovations to major structural changes, we make your property more beautiful, comfortable, and useful while increasing its value.",
    deliverables: [
      "Complete home & commercial remodeling and structural changes",
      "Modern bathroom, toilet & interior upgrades",
      "Enhanced comfort, utility & significant property value increase",
    ],
  },
  {
    number: "10",
    title: "3D Visualization",
    category: "Consulting & 3D",
    icon: Layers,
    image: visualization3dImg,
    description:
      "Photorealistic 3D exterior and interior renderings, architectural walkthroughs, and CGI modeling to experience your project before construction.",
    details:
      "We create realistic 3D designs to help you see your building before construction begins. Our designs focus on both beauty and practicality, using materials and structures that can be built in real life. This helps you understand your project clearly and make the right decisions before starting construction.",
    deliverables: [
      "Realistic 3D visualizations before construction starts",
      "Practical designs with buildable, real-life materials",
      "Clear visual clarity for informed and confident decisions",
    ],
  },
];

export const serviceCategories = [
  "All",
  "Construction",
  "Interiors",
  "Permits & Approvals",
  "Consulting & 3D",
];

