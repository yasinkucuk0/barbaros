import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";

const reviewSlots = [
  { number: "01" },
  { number: "02" },
  { number: "03" },
];

function Reviews() {
  return (
    <section className="reviews" id="yorumlar">
      <div className="reviews-grid-bg" />
      <div className="reviews-glow" />

      <div className="reviews-container">
        <motion.div
          className="reviews-header"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="reviews-label">
            <span>07</span>
            <div />
            MÜŞTERİ DENEYİMİ
          </div>

          <div className="reviews-heading-row">
            <h2>
              BİZ DEĞİL,
              <br />
              <em>ONLAR ANLATSIN.</em>
            </h2>

            <div className="reviews-intro">
              <div className="reviews-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    strokeWidth={1.3}
                    fill="currentColor"
                  />
                ))}
              </div>

              <p>
                Barbaros deneyimini en iyi,
                koltuğumuzdan kalkan misafirlerimiz anlatır.
                Gerçek müşteri yorumlarımız burada yer alacak.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="reviews-list">
          {reviewSlots.map((review, index) => (
            <motion.article
              className="review-card"
              key={review.number}
              initial={{
                opacity: 0,
                y: 45,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.75,
                delay: index * 0.12,
              }}
            >
              <div className="review-top">
                <span>{review.number}</span>

                <Quote
                  size={30}
                  strokeWidth={1}
                />
              </div>

              <div className="review-card-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={12}
                    strokeWidth={1}
                  />
                ))}
              </div>

              <p className="review-placeholder-text">
                GERÇEK MÜŞTERİ
                <br />
                YORUMU YAKINDA
              </p>

              <div className="review-divider" />

              <div className="review-person">
                <div className="review-avatar">
                  <span>+</span>
                </div>

                <div>
                  <strong>MÜŞTERİ ADI</strong>
                  <span>BARBAROS MİSAFİRİ</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="reviews-signature"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span>BARBAROS</span>

          <p>
            Her koltuktan
            <em> memnuniyetle </em>
            kalkmanız için.
          </p>

          <span>HASSA • HATAY</span>
        </motion.div>
      </div>
    </section>
  );
}

export default Reviews;