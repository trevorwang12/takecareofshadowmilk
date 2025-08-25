import { HomeTemplate } from "@/components/home/HomeTemplate";
import { incrediboxVitalsMainSchema, websiteSchema } from "./schema";

export const metadata = {
  alternates: {
    canonical: '/',
  },
  title: "Take Care of Shadow Milk - Play Free Virtual Pet Game Online",
  description: "Play Take Care of Shadow Milk - the viral Scratch virtual pet game online for free. Experience the ultimate Shadow Milk Cookie simulator from Cookie Run Kingdom. Feed, care for, or prank your virtual pet with no rules!",
  keywords: ["take care of shadow milk", "shadow milk game", "take care of your own shadow milk", "virtual pet game", "scratch game", "cookie run kingdom", "shadow milk cookie", "pet simulator"],
};

export default function Page() {
  return (
    <>
      <HomeTemplate />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(incrediboxVitalsMainSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
