import { sx } from "@/lib/css";

export function Problem() {
  return (
    <section
      className="sec-problem"
      style={sx(
        "position:relative;z-index:1;max-width:1240px;margin:0 auto;padding:100px 32px 40px;text-align:center",
      )}
    >
      <p
        style={sx(
          "font-size:13px;letter-spacing:.16em;color:#FCA900;font-weight:600;margin-bottom:18px",
        )}
      >
        AN ESTIMATED $200B+ SITS UNCLAIMED
      </p>
      <h2
        style={sx(
          "font-size:44px;font-weight:800;letter-spacing:-.03em;line-height:1.08;max-width:820px;margin:0 auto",
        )}
      >
        Crypto doesn&apos;t lose your money.
        <br />
        It just stops showing you where it went.
      </h2>
    </section>
  );
}
