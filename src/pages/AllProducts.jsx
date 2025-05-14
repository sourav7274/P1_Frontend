import { motion } from "framer-motion";
import { useState } from "react";

const AllProducts = () => {
  const [ghoverIndex, gsetHoverIndex] = useState(null);
  const [jhoverIndex, jsetHoverIndex] = useState(null);
  const [bhoverIndex, bsetHoverIndex] = useState(null);
  const [phoverIndex, psetHoverIndex] = useState(null);

  const gameImages = [
    "https://wallpapercave.com/wp/wp5912989.png",
    "https://wallpapercave.com/wp/wp12456652.jpg",
    "https://wallpapercave.com/uwp/uwp4226832.jpeg",
    "https://wallpapercave.com/uwp/uwp4228509.jpeg",
  ];

  const jacketImages = [
    "https://img.freepik.com/free-photo/young-attractive-male-posing-nature_181624-46384.jpg?ga=GA1.1.140433244.1747226269&semt=ais_hybrid&w=740",
    "https://media.gettyimages.com/id/1386238968/photo/young-model-with-long-hair-in-light-brown-coat-goes-towards-the-camera.jpg?s=612x612&w=gi&k=20&c=bb5k6aL6NQDRmrxbEjz7dri72XZXC_RADggxOmmu4BY=",
    "https://media.gettyimages.com/id/1304260103/photo/rear-view-of-a-man-at-the-sea.jpg?s=2048x2048&w=gi&k=20&c=4kTfiPL7R9XCq6qG1Ogt1NhVHE-YN3RJwUrRoYec8nA=",
    "https://media.gettyimages.com/id/1124489593/photo/portrait-of-young-man-smiling-in-city-street.jpg?s=2048x2048&w=gi&k=20&c=PWC2uHvpvAcCGuzWek0NwrAUVkTtgW-ncS8uvHyxuA8=",
  ];
  const bookImages = [
    "https://rukminim2.flixcart.com/image/750/900/l5jxt3k0/book/k/q/u/portrait-drawing-original-imagg79h6gzzkzza.jpeg?q=20&crop=false",
    "https://m.media-amazon.com/images/I/51V4rQ2crVL._SL500_.jpg",
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1688418557i/78534377.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvQCnfBD-2zru-2Vhask-ePDTuB0CeuJNlLg&s",
  ];
  const phoneImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtNjb3cAGuOm8nN0Iopqcehh8ZG2F7PwSlhg&s",
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D",
    "https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?semt=ais_hybrid&w=740",
    "https://vsprod.vijaysales.com/media/catalog/product/2/2/225663-image1_1.jpg?optimize=medium&fit=bounds&height=500&width=500",
  ];
  return (
    <div className="container">
      <motion.div
        className="bg-black text-light"
        style={{
          position: "relative",
          height: "500px",
          width: "100%",
          overflow: "hidden",
          display: "flex",
        }}
      >
        <motion.h1
          style={{
            position: "absolute",
            top: "40%",
            left: "2rem",
            zIndex: 10,
            color: "white",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: ghoverIndex !== null ? 0.8 : 1 }}
        >
          Explore Games
        </motion.h1>

        {gameImages.map((img, index) => {
          const isHovered = ghoverIndex === index;
          const isAnyHovered = ghoverIndex !== null;

          return (
            <motion.div
              key={index}
              layout
              onMouseEnter={() => gsetHoverIndex(index)}
              onMouseLeave={() => gsetHoverIndex(null)}
              initial={false}
              animate={{
                flexGrow: isHovered ? 3 : 1,
                opacity: isAnyHovered ? (isHovered ? 1 : 0.5) : 0,
              }}
              transition={{ duration: 0.4 }}
              style={{
                height: "100%",
                overflow: "hidden",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <motion.img
                src={img}
                alt="game"
                layout
                initial={false}
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.4 }}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        className="bg-black text-light"
        style={{
          position: "relative",
          height: "500px",
          width: "100%",
          overflow: "hidden",
          display: "flex",
        }}
      >
        <motion.h1
          style={{
            position: "absolute",
            top: "40%",
            left: "2rem",
            zIndex: 10,
            color: "white",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: phoverIndex !== null ? 0.8 : 1 }}
        >
          Explore Phones
        </motion.h1>

        {phoneImages.map((img, index) => {
          const isHovered = phoverIndex === index;
          const isAnyHovered = phoverIndex !== null;

          return (
            <motion.div
              key={index}
              layout
              onMouseEnter={() => psetHoverIndex(index)}
              onMouseLeave={() => psetHoverIndex(null)}
              initial={false}
              animate={{
                flexGrow: isHovered ? 3 : 1,
                opacity: isAnyHovered ? (isHovered ? 1 : 0.5) : 0,
              }}
              transition={{ duration: 0.4 }}
              style={{
                height: "100%",
                overflow: "hidden",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <motion.img
                src={img}
                alt="game"
                layout
                initial={false}
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.4 }}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>
      <motion.div
        className="bg-black text-light"
        style={{
          position: "relative",
          height: "500px",
          width: "100%",
          overflow: "hidden",
          display: "flex",
        }}
      >
        <motion.h1
          style={{
            position: "absolute",
            top: "40%",
            left: "2rem",
            zIndex: 10,
            color: "white",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: jhoverIndex !== null ? 0.8 : 1 }}
        >
          Explore Jackets
        </motion.h1>

        {jacketImages.map((img, index) => {
          const isHovered = jhoverIndex === index;
          const isAnyHovered = jhoverIndex !== null;

          return (
            <motion.div
              key={index}
              layout
              onMouseEnter={() => jsetHoverIndex(index)}
              onMouseLeave={() => jsetHoverIndex(null)}
              initial={false}
              animate={{
                flexGrow: isHovered ? 3 : 1,
                opacity: isAnyHovered ? (isHovered ? 1 : 0.5) : 0,
              }}
              transition={{ duration: 0.4 }}
              style={{
                height: "100%",
                overflow: "hidden",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <motion.img
                src={img}
                alt="game"
                layout
                initial={false}
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.4 }}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>
      <motion.div
        className="bg-black text-light"
        style={{
          position: "relative",
          height: "500px",
          width: "100%",
          overflow: "hidden",
          display: "flex",
        }}
      >
        <motion.h1
          style={{
            position: "absolute",
            top: "40%",
            left: "2rem",
            zIndex: 10,
            color: "white",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: jhoverIndex !== null ? 0.8 : 1 }}
        >
          Explore Books
        </motion.h1>

        {bookImages.map((img, index) => {
          const isHovered = bhoverIndex === index;
          const isAnyHovered = bhoverIndex !== null;

          return (
            <motion.div
              key={index}
              layout
              onMouseEnter={() => bsetHoverIndex(index)}
              onMouseLeave={() => bsetHoverIndex(null)}
              initial={false}
              animate={{
                flexGrow: isHovered ? 3 : 1,
                opacity: isAnyHovered ? (isHovered ? 1 : 0.5) : 0,
              }}
              transition={{ duration: 0.4 }}
              style={{
                height: "100%",
                overflow: "hidden",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <motion.img
                src={img}
                alt="game"
                layout
                initial={false}
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.4 }}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default AllProducts;
