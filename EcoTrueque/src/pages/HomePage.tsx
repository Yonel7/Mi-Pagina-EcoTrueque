import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Recycle, Users, ThumbsUp } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-400 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Intercambia productos ecológicos sin usar dinero
              </h1>
              <p className="text-xl mb-8">
                Únete a la comunidad de EcoTrueque y forma parte de la economía circular.
                Intercambia, reutiliza y ayuda al planeta.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/register"
                  className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold text-center hover:bg-green-100 transition"
                >
                  Registrarse
                </Link>
                <Link
                  to="/products"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-green-500 transition"
                >
                  Ver Productos
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://images.pexels.com/photos/7262876/pexels-photo-7262876.jpeg"
                alt="Intercambio ecológico"
                className="rounded-lg shadow-xl max-w-full h-auto"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">¿Cómo funciona?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              EcoTrueque te permite intercambiar productos de forma sencilla y sin usar dinero
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Publica tus productos</h3>
              <p className="text-gray-600">
                Sube fotos y detalles de los productos ecológicos que quieres intercambiar.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Encuentra intercambios</h3>
              <p className="text-gray-600">
                Busca productos que te interesen y propón un intercambio con tus artículos.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Realiza el trueque</h3>
              <p className="text-gray-600">
                Coordina con el otro usuario y completa el intercambio de forma segura.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Productos Destacados</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre algunos de los productos disponibles para intercambio
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <img
                src="https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg"
                alt="Macetas recicladas"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Macetas Recicladas</h3>
                <p className="text-gray-600 mb-4">
                  Macetas hechas con botellas de plástico recicladas, perfectas para plantas pequeñas.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    Decoración
                  </span>
                  <Link
                    to="/products"
                    className="text-green-600 hover:text-green-800 font-medium"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <img
                src="https://http2.mlstatic.com/D_NQ_NP_894176-MLA73022695022_112023-O.webp"
                alt="Compostaje casero"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Kit de Compostaje</h3>
                <p className="text-gray-600 mb-4">
                  Kit completo para iniciar tu propio compostaje en casa, incluye guía de uso.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    Jardín
                  </span>
                  <Link
                    to="/products"
                    className="text-green-600 hover:text-green-800 font-medium"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <img
                src="https://materialesecologicos.es/wp-content/uploads/2019/02/bolsas-ecologicas-768x944.jpg"
                alt="Bolsas ecológicas"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Bolsas Ecológicas</h3>
                <p className="text-gray-600 mb-4">
                  Set de bolsas reutilizables para compras, hechas con tela reciclada.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    Hogar
                  </span>
                  <Link
                    to="/products"
                    className="text-green-600 hover:text-green-800 font-medium"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              to="/products"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Ver todos los productos
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Lo que dice nuestra comunidad</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conoce las experiencias de quienes ya forman parte de EcoTrueque
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-green-200 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <h4 className="font-semibold">María González</h4>
                  <p className="text-gray-600 text-sm">Lima, Perú</p>
                </div>
              </div>
              <p className="text-gray-700">
                "EcoTrueque me ha permitido dar una segunda vida a objetos que ya no usaba y conseguir
                cosas que necesitaba sin gastar dinero. ¡Una idea genial para cuidar el planeta!"
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-green-200 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <h4 className="font-semibold">Carlos Rodríguez</h4>
                  <p className="text-gray-600 text-sm">Arequipa, Perú</p>
                </div>
              </div>
              <p className="text-gray-700">
                "He realizado más de 15 intercambios en la plataforma. La comunidad es muy amable y
                comprometida con el medio ambiente. Totalmente recomendado."
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-green-200 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <h4 className="font-semibold">Laura Martínez</h4>
                  <p className="text-gray-600 text-sm">Cusco, Perú</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Gracias a EcoTrueque he conocido personas con mis mismos intereses ecológicos.
                Además de intercambiar productos, he aprendido mucho sobre sostenibilidad."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para unirte a EcoTrueque?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Forma parte de nuestra comunidad y comienza a intercambiar productos de forma sostenible.
            Juntos podemos hacer la diferencia.
          </p>
          <Link
            to="/register"
            className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-100 transition"
          >
            Crear una cuenta gratis
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;