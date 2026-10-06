import { motion } from "motion/react";
import { Scissors, ArrowUpRight } from "lucide-react";

const team = [
  {
    number: "01",
    name: "YASİN KÜÇÜK",
    role: "USTA BERBER & KURUCU",
    experience: "15",
    age: "29",
    initials: "YK",
    quote: "Ustalık, yılların tekrarından değil; her gün daha iyisini aramaktan gelir.",
  },
  {
    number: "02",
    name: "EMİR KÜÇÜK",
    role: "USTA BERBER",
    experience: "4",
    age: "20",
    initials: "EK",
    quote: "Her kesim farklı bir karakter, her detay farklı bir imza.",
  },
];

function Team() {
  return (
    <section className="team" id="ekibimiz">
      <div className="team-grid-bg" />
      <div className="team-glow team-glow-left" />
      <div className="team-glow team-glow-right" />

      <div className="team-container">
        <motion.div
          className="team-header"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="team-label">
            <span>04</span>
            <div />
            EKİBİMİZ
          </div>

          <div className="team-heading-row">
            <h2>
              MAKASIN
              <br />
              <em>ARDINDAKİLER.</em>
            </h2>

            <p>
              Barbaros'un karakterini oluşturan iki usta.
              Aynı çatı altında, aynı özenle, her müşteriye
              kişiye özel bir dokunuş.
            </p>
          </div>
        </motion.div>

        <div className="team-members">
          {team.map((member, index) => (
            <motion.article
              className="team-member"
              key={member.name}
              initial={{
                opacity: 0,
                x: index === 0 ? -60 : 60,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 1,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="team-photo">
                <div className="team-photo-placeholder">
                  <span>{member.initials}</span>

                  <Scissors
                    size={30}
                    strokeWidth={1}
                  />

                  <small>
                    PORTRE
                    <br />
                    YAKINDA
                  </small>
                </div>

                <div className="team-photo-gradient" />

                <span className="team-member-number">
                  {member.number}
                </span>

                <div className="team-photo-name">
                  <span>{member.role}</span>
                  <h3>{member.name}</h3>
                </div>
              </div>

              <div className="team-member-info">
                <div className="team-stat">
                  <strong>{member.experience}</strong>

                  <span>
                    YILLIK
                    <br />
                    DENEYİM
                  </span>
                </div>

                <div className="team-stat">
                  <strong>{member.age}</strong>

                  <span>
                    YAŞ
                  </span>
                </div>

                <div className="team-member-arrow">
                  <ArrowUpRight
                    size={24}
                    strokeWidth={1.2}
                  />
                </div>
              </div>

              <p className="team-quote">
                “{member.quote}”
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="team-footer"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span>BARBAROS ERKEK KUAFÖRÜ</span>

          <div />

          <p>
            15 yıllık tecrübe.
            <br />
            Yeni nesil bakış.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Team;