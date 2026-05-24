"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, ExternalLink, RefreshCw } from "lucide-react";

interface IgPost {
  id:           string;
  media_url:    string;
  permalink:    string;
  caption?:     string;
  media_type:   string;
  thumbnail_url?: string;
}

// Fallback images (placeholders shown when Instagram isn't connected yet)
const FALLBACK: IgPost[] = Array.from({ length: 9 }, (_, i) => ({
  id:          `placeholder-${i}`,
  media_url:   "",           // will show gradient placeholder
  permalink:   "#",
  caption:     "Trabajo del salón",
  media_type:  "IMAGE",
}));

const IG_HANDLE = process.env.NEXT_PUBLIC_SALON_IG ?? "@lumiere.beauty";

export default function Gallery() {
  const [posts, setPosts]       = useState<IgPost[]>(FALLBACK);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(false);

  useEffect(() => {
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data) => {
        if (data?.posts?.length) {
          setPosts(data.posts.slice(0, 9));
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const gradients = [
    "from-petal to-blush",
    "from-blush to-champagne",
    "from-champagne to-nude",
    "from-nude to-petal",
    "from-petal to-champagne",
    "from-blush to-nude",
    "from-champagne to-petal",
    "from-nude to-blush",
    "from-petal to-nude",
  ];

  return (
    <section id="galeria" className="py-24 lg:py-32 bg-cream">
      <div className="section-padding max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="w-8 h-px bg-mauve" />
            <span className="eyebrow">Nuestro trabajo</span>
            <div className="w-8 h-px bg-mauve" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-section text-charcoal"
          >
            Galería
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-2 mt-4"
          >
            <Instagram size={16} className="text-mauve" />
            <a
              href={`https://instagram.com/${IG_HANDLE.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-mink hover:text-mauve transition-colors link-underline"
            >
              {IG_HANDLE}
            </a>
          </motion.div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-10 text-mink">
            <RefreshCw size={18} className="animate-spin text-mauve" />
            <span className="font-body text-sm">Cargando galería...</span>
          </div>
        )}

        {/* Grid */}
        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {posts.map((post, i) => (
              <motion.a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden block img-zoom"
              >
                {post.media_url ? (
                  <Image
                    src={post.media_url}
                    alt={post.caption ?? "Foto del salón"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center`}
                  >
                    <span className="font-display text-mauve/50 italic text-sm">
                      {i + 1}
                    </span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ExternalLink size={20} className="text-white" />
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* Error / no connection notice */}
        {error && (
          <p className="text-center font-body text-sm text-mink/60 mt-6">
            Las imágenes de Instagram no están disponibles en este momento.
          </p>
        )}

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href={`https://instagram.com/${IG_HANDLE.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <Instagram size={16} />
            Ver más en Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
