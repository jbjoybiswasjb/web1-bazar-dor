import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Product {
  id: number;
  image: string;
  nameBn: string;
  today: number;
  unit: string;
  change?: {
    dir: string;
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const data: Product[] = await res.json();

  return (
    <div className="w-full overflow-hidden">
      <MarqueeText direction="right" duration={25} className="my-3">
        <div className="flex items-center gap-8 whitespace-nowrap">
          {data.map((item) => (
            <span key={item.id} className="inline-flex items-center gap-2">
              <span>{item?.image}</span>
              <span className="font-medium">{item?.nameBn}</span>
              <span>৳{item?.today}</span>
              <span>/</span>
              <span>{item?.unit}</span>
              <span>{item?.change?.dir}</span>
              <span>({item?.change?.pct}%)</span>
            </span>
          ))}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;