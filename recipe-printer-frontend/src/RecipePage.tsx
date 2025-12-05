import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Loader2 } from "lucide-react";

const RecipePage: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    setIsGenerating(true);
    try {
      // Create a clone of the element to render it with fixed dimensions
      // This prevents the PDF from being affected by the user's screen width
      const element = printRef.current;
      const clone = element.cloneNode(true) as HTMLElement;
      
      // Create a container for the clone that is off-screen but part of the DOM
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.top = '-9999px';
      container.style.left = '-9999px';
      // Set a fixed width closer to A4 aspect ratio (approx 794px is A4 width at 96 DPI)
      // We use a slightly larger width for better resolution, then scale down
      container.style.width = '1000px'; 
      container.appendChild(clone);
      document.body.appendChild(container);

      // Force the clone to take full width of container and reset specific styles that might interfere
      clone.style.width = '100%';
      clone.style.margin = '0';
      clone.style.maxWidth = 'none';
      clone.style.boxShadow = 'none'; // Remove shadow for clean print
      
      const canvas = await html2canvas(clone, {
        scale: 2, // High res
        useCORS: true,
        logging: false,
        windowWidth: 1000, // Match container width
      });

      // Clean up the DOM
      document.body.removeChild(container);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('zesty-lemon-garlic-shrimp-pasta.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans relative">
      {/* Floating Download Button */}
      <button
        onClick={handleDownloadPDF}
        disabled={isGenerating}
        className="fixed bottom-8 right-8 z-50 bg-gray-900 text-white p-4 rounded-full shadow-xl hover:bg-gray-800 transition-all duration-300 flex items-center gap-2 group"
        aria-label="Download PDF"
      >
        {isGenerating ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <Download className="w-6 h-6 group-hover:scale-110 transition-transform" />
        )}
        <span className="font-medium pr-2 hidden group-hover:inline-block transition-all duration-300">
          Download PDF
        </span>
      </button>

      {/* Printable Area */}
      <div
        className="max-w-4xl mx-auto bg-white shadow-2xl overflow-hidden"
        ref={printRef}
      >
        {/* Hero Image Placeholder */}
        <div 
          className="w-full h-64 md:h-80 bg-gray-300 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')" }}
          aria-label="Shrimp Pasta"
        >
        </div>

        <div className="p-8 md:p-12">
          {/* Header Section */}
          <header className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              Zesty Lemon Garlic Shrimp Pasta
            </h1>

            {/* Metadata Row */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm md:text-base text-gray-600 tracking-wide uppercase font-medium border-t border-b border-gray-200 py-4 mx-auto max-w-2xl">
              <span className="px-4">Servings: 4</span>
              <span className="hidden md:block text-gray-300">|</span>
              <span className="px-4">Prepping Time: 15 Min</span>
              <span className="hidden md:block text-gray-300">|</span>
              <span className="px-4">Cooking Time: 20 Min</span>
            </div>
          </header>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8">
            {/* Left Column: Ingredients */}
            <aside className="md:col-span-4 bg-[#f9f1f0] p-6 md:p-8 rounded-lg h-full">
              <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2 inline-block">
                Ingredients
              </h2>
              <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
                <li>8 oz linguine pasta</li>
                <li>2 tbsp olive oil</li>
                <li>1 lb large shrimp, peeled and deveined</li>
                <li>Salt to taste</li>
                <li>Black pepper to taste</li>
                <li>1 tbsp minced garlic</li>
                <li>1 tsp red pepper flakes</li>
                <li>1/2 cup chicken broth</li>
                <li>1 cup fresh lemon juice</li>
                <li>Zest of 1 lemon</li>
                <li>1/2 cup finely chopped fresh parsley</li>
                <li>Grated Parmesan cheese for serving</li>
              </ul>
            </aside>

            {/* Right Column: Instructions */}
            <section className="md:col-span-8 pt-8 md:pt-0 pl-0 md:pl-4">
              <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2 inline-block">
                Instructions
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="text-3xl font-serif font-bold text-gray-200 -mt-2">
                    1
                  </span>
                  <div>
                    <p className="text-gray-800 leading-relaxed">
                      <span className="font-bold text-gray-900">
                        Cook the pasta:
                      </span>{" "}
                      Bring a large pot of salted water to a boil. Add the
                      linguine and cook until al dente, according to the package
                      instructions. Drain and set aside.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-3xl font-serif font-bold text-gray-200 -mt-2">
                    2
                  </span>
                  <div>
                    <p className="text-gray-800 leading-relaxed">
                      <span className="font-bold text-gray-900">
                        Prepare the shrimp:
                      </span>{" "}
                      Meanwhile, heat the olive oil in a large skillet over
                      medium-high heat. Add the shrimp, season with salt and
                      pepper, and sauté until they turn pink, about 2-3 minutes
                      per side. Remove the shrimp from the skillet and set
                      aside.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-3xl font-serif font-bold text-gray-200 -mt-2">
                    3
                  </span>
                  <div>
                    <p className="text-gray-800 leading-relaxed">
                      <span className="font-bold text-gray-900">
                        Make the sauce:
                      </span>{" "}
                      In the same skillet, add the minced garlic and red pepper
                      flakes. Cook until the garlic is fragrant, about 1 minute.
                      Stir in the chicken broth, lemon juice, and lemon zest.
                      Bring the mixture to a simmer and cook for about 5
                      minutes, or until the sauce has reduced by half.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-3xl font-serif font-bold text-gray-200 -mt-2">
                    4
                  </span>
                  <div>
                    <p className="text-gray-800 leading-relaxed">
                      <span className="font-bold text-gray-900">
                        Combine the pasta and shrimp with the sauce:
                      </span>{" "}
                      Return the shrimp to the skillet. Add the cooked pasta and
                      toss to combine, making sure the pasta is well-coated with
                      the sauce.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-3xl font-serif font-bold text-gray-200 -mt-2">
                    5
                  </span>
                  <div>
                    <p className="text-gray-800 leading-relaxed">
                      <span className="font-bold text-gray-900">Serve:</span>{" "}
                      Remove the skillet from the heat. Sprinkle with the
                      chopped fresh parsley and grated Parmesan cheese. Serve
                      immediately.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer: Tips and Variations */}
          <footer className="mt-12 pt-8 border-t border-gray-100">
            <h3 className="text-lg font-serif font-semibold text-gray-800 mb-2">
              Tips and Variations
            </h3>
            <p className="text-gray-600 italic text-sm leading-relaxed">
              For an extra punch of flavor, add a splash of white wine to the
              sauce. Feel free to add more vegetables like cherry tomatoes or
              spinach for added nutrition. Use whole grain pasta for a healthier
              twist.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
