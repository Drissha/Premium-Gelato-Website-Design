import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useOrderModal } from "./useOrderModal";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Gojek, Shopee, Tokopedia, WA } from "../imageImports";

export default function OrderModal() {
  const { isOpen, closeModal } = useOrderModal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          />

          {/* Modal */}
          <div className="fixed inset-0 w-full sm:w-[100%] z-50 flex items-center justify-center p-4">
            <motion.div
              className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl"
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                duration: 0.2,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close X */}
              <button
                onClick={closeModal}
                className="absolute text-pink-300 right-4 top-4 rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={18} />
              </button>

              <h2 className="mb-6 text-2xl text-center font-bold text-blue-reguler">
                Order Now
              </h2>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full h-[200px] text-gray-700 px-4 py-2 rounded font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ImageWithFallback
                    src={WA}
                    alt="WhatsApp"
                    onClick={() => window.open("https://wa.me/08111187979", "_blank")}
                    className="w-full h-full object-contain cursor-pointer"
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full h-[200px] text-gray-700 px-4 py-2 rounded font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ImageWithFallback
                    src={Tokopedia}
                    alt="Tokopedia"
                    onClick={() => window.open("https://tk.tokopedia.com/ZSxtNbvHj/", "_blank")}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full h-[200px] text-gray-700 px-4 py-2 rounded font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ImageWithFallback
                    src={Shopee}
                    alt="Shopee"
                    onClick={() => window.open("https://shopee.co.id/universal-link/now-food/shop/393626?deep_and_deferred=1&shareChannel=copy_link", "_blank")}
                    className="w-full h-full object-contain cursor-pointer"
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full h-[200px] text-gray-700 px-4 py-2 rounded font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ImageWithFallback
                    src={Gojek}
                    alt="Gojek"
                    onClick={() => window.open("https://gofood.link/a/yM9ZVrJ", "_blank")}
                    className="w-full h-full object-contain cursor-pointer"
                  />
                </motion.button>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="rounded-lg w-full border px-4 py-2 bg-gradient-to-r from-blue-reguler via-pink-200 to-pink-reguler hover:bg-right text-gray-700 px-6 lg:px-8 py-3 rounded-full shadow-lg shadow-pink-200/50 hover:shadow-xl hover:shadow-pink-300/60 transition-all duration-300"
                >
                  Close
                </button>

                {/* Submit Button */}
                {/* <button
                  onClick={() => {
                    // submit order
                    closeModal();
                  }}
                  className="rounded-lg bg-black px-4 py-2 text-white hover:opacity-90"
                >
                  Submit Order
                </button> */}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}