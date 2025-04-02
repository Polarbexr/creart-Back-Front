import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export const FAQReviews = () => {
  const [faqs] = useState([
    { question: "¿Cómo puedo registrarme?", answer: "Puedes registrarte haciendo clic en el botón de 'Registrarse' en la parte superior derecha de la página." },
    { question: "¿Cuáles son los métodos de pago aceptados?", answer: "Aceptamos tarjetas de crédito, PayPal y transferencias bancarias." },
    { question: "¿Cómo contacto con soporte?", answer: "Puedes contactarnos a través del chat en vivo o enviarnos un correo electrónico a soporte@example.com." }
  ]);

  const [reviews] = useState([
    { name: "Carlos R.", comment: "Excelente servicio, muy rápido y confiable." },
    { name: "María G.", comment: "Me encantó la atención al cliente, resolvieron mis dudas de inmediato." },
    { name: "Javier L.", comment: "Muy recomendable, los precios y la calidad son insuperables." }
  ]);

  return (
    <>
      <div className="faq-reviews-container">
        <div className="columns-container">
          <div className="faq-column">
            <h2 className="section-title">Preguntas Frecuentes</h2>
            <div className="faq-section">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <div className="faq-question">{faq.question}</div>
                  <div className="faq-answer">{faq.answer}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="reviews-column">
            <h2 className="section-title">Comentarios de Usuarios</h2>
            <div className="reviews-section">
              {reviews.map((review, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardContent className="review-content">
                      <p className="review-name">{review.name}</p>
                      <p className="review-comment">{review.comment}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .faq-reviews-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 1.5rem;
        }
        .columns-container {
          display: flex;
          gap: 2rem;
        }
        .faq-column, .reviews-column {
          flex: 1;
        }
        .section-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        .faq-section {
          margin-bottom: 2rem;
        }
        .faq-item {
          border-bottom: 1px solid #e2e8f0;
          padding: 1rem 0;
        }
        .faq-question {
          font-size: 1.125rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          cursor: pointer;
        }
        .faq-answer {
          font-size: 1rem;
          color: #4a5568;
          padding-left: 1rem;
        }
        .reviews-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .review-content {
          padding: 1rem;
        }
        .review-name {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .review-comment {
          color: #4a5568;
        }
      `}</style>
    </>
  );
};

export default FAQReviews;
