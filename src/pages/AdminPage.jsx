import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Package, DollarSign, Plus, Edit2, Trash2, 
  RotateCcw, Check, ArrowLeft, Lock, Sparkles, Image, 
  Building2, Save, FileText, Phone, MapPin, Clock, Instagram, 
  Tag, CheckCircle2
} from 'lucide-react';
import { useProductsContext } from '../context/ProductContext';
import { useCurrency } from '../context/CurrencyContext';
import { useCompany } from '../context/CompanyContext';
import { PRODUCT_CATEGORIES } from '../config/constants';

export function AdminPage() {
  const { products, updateProduct, addProduct, deleteProduct, resetProductsToDefault } = useProductsContext();
  const { bcvRate } = useCurrency();
  const { 
    companyInfo, 
    updateCompanyInfo, 
    banners, 
    updateBanner, 
    addBanner, 
    deleteBanner, 
    resetCompanyInfoToDefault 
  } = useCompany();

  // Estado de Acceso Administrativo (PIN de seguridad)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState('');

  // Pestaña activa del CMS: 'products' | 'banners' | 'company'
  const [activeTab, setActiveTab] = useState('products');

  // Notificación de éxito al guardar
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // --- ESTADO TAB 1: PRODUCTOS ---
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newProductData, setNewProductData] = useState({
    name: '',
    category: 'carnes',
    categoryName: 'Carnicería Premium',
    price: '',
    unit: 'Kg',
    description: '',
    image: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  // --- ESTADO TAB 2: BANNERS ---
  const [showAddBannerForm, setShowAddBannerForm] = useState(false);
  const [newBannerData, setNewBannerData] = useState({
    title: '',
    subtitle: '',
    badge: 'Oferta Especial',
    image: '',
    ctaText: 'Ver Promociones',
    ctaCategory: 'todos'
  });

  // --- ESTADO TAB 3: EMPRESA ---
  const [companyForm, setCompanyForm] = useState({ ...companyInfo });

  const showNotification = (msg) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPin.trim() === 'rosaliera2026' || adminPin.trim() === 'admin' || adminPin.trim() === '1234') {
      setIsAdminAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Clave de administrador incorrecta. Prueba usando: rosaliera2026');
    }
  };

  // HANDLERS TAB 1: PRODUCTOS
  const handlePriceChange = (id, newPriceVal) => {
    const val = parseFloat(newPriceVal);
    if (!isNaN(val) && val >= 0) {
      updateProduct(id, { price: val });
    }
  };

  const handleToggleOffer = (id, currentOfferState) => {
    updateProduct(id, { isOffer: !currentOfferState });
  };

  const handleAddNewProductSubmit = (e) => {
    e.preventDefault();
    if (!newProductData.name || !newProductData.price) {
      alert('Ingresa al menos el nombre y el precio del producto.');
      return;
    }

    const matchedCategory = PRODUCT_CATEGORIES.find(c => c.id === newProductData.category);

    addProduct({
      ...newProductData,
      price: parseFloat(newProductData.price),
      categoryName: matchedCategory ? matchedCategory.name : newProductData.categoryName
    });

    setShowAddProductForm(false);
    setNewProductData({
      name: '',
      category: 'carnes',
      categoryName: 'Carnicería Premium',
      price: '',
      unit: 'Kg',
      description: '',
      image: ''
    });

    showNotification('¡Producto agregado al catálogo exitosamente!');
  };

  // HANDLERS TAB 2: BANNERS
  const handleBannerFieldChange = (id, field, value) => {
    updateBanner(id, { [field]: value });
  };

  const handleAddNewBannerSubmit = (e) => {
    e.preventDefault();
    if (!newBannerData.title) {
      alert('Ingresa el título del banner.');
      return;
    }
    addBanner(newBannerData);
    setShowAddBannerForm(false);
    setNewBannerData({
      title: '',
      subtitle: '',
      badge: 'Oferta Especial',
      image: '',
      ctaText: 'Ver Promociones',
      ctaCategory: 'todos'
    });
    showNotification('¡Nuevo banner publicado en el carrusel principal!');
  };

  // HANDLERS TAB 3: INFORMACIÓN EMPRESA
  const handleCompanySave = (e) => {
    e.preventDefault();
    updateCompanyInfo(companyForm);
    showNotification('¡Información de la empresa actualizada globalmente!');
  };

  const handleResetCompany = () => {
    if (window.confirm('¿Deseas restablecer los datos de la empresa y banners a sus valores predeterminados?')) {
      resetCompanyInfoToDefault();
      setCompanyForm(companyInfo);
      showNotification('Datos de la empresa restablecidos por defecto.');
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-50/70 min-h-screen py-8 pb-28">
      <div className="container mx-auto px-4 max-w-6xl space-y-6">
        
        {/* Volver a la Tienda */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-green-700 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-2xs hover:shadow-sm transition-all"
        >
          <ArrowLeft size={16} />
          <span>Volver a la Tienda</span>
        </Link>

        {/* Notificación Toast Administrativa */}
        {saveSuccessMsg && (
          <div className="fixed top-5 right-5 z-50 bg-gray-900 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-2xl border border-gray-700 flex items-center gap-2 animate-fade-in">
            <CheckCircle2 size={18} className="text-green-400" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BLOQUEO DE SEGURIDAD / AUTENTICACIÓN ADMIN */}
        {/* ========================================================================= */}
        {!isAdminAuthenticated ? (
          <div className="max-w-md mx-auto my-12 bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-6 text-center">
            <div className="w-14 h-14 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <ShieldCheck size={30} />
            </div>

            <div>
              <h1 className="text-xl font-black text-gray-900">Panel Administrativo CMS</h1>
              <p className="text-xs text-gray-500 mt-1">
                Ingresa la clave de administrador para gestionar productos, banners e información global.
              </p>
            </div>

            {pinError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl font-medium">
                {pinError}
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 text-gray-400" size={16} />
                <input
                  type="password"
                  required
                  placeholder="Ingresa la clave (ej. rosaliera2026)"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-3 text-xs focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-100 font-bold"
                />
              </div>

              <button
                type="submit"
                style={{ backgroundColor: '#58A618' }}
                className="w-full hover:bg-green-600 text-white font-extrabold text-xs py-3.5 px-4 rounded-xl shadow-lg transition-all"
              >
                Ingresar al Panel Administrativo
              </button>
            </form>
          </div>
        ) : (
          /* ========================================================================= */
          /* DASHBOARD ADMINISTRATIVO CMS COMPLETO */
          /* ========================================================================= */
          <div className="space-y-6 animate-fade-in">
            
            {/* Encabezado Principal & Selector de Pestañas CMS */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                    Sistema de Gestión CMS
                  </span>
                  <h1 className="text-xl md:text-2xl font-black text-gray-900 mt-2 flex items-center gap-2">
                    <Building2 className="text-green-600" size={26} />
                    <span>Control General de la Tienda Web</span>
                  </h1>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAdminAuthenticated(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs py-2.5 px-4 rounded-xl transition-all"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>

              {/* Pestañas de Navegación del Panel CMS */}
              <div className="flex flex-wrap border-b border-gray-200 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('products')}
                  className={`pb-3 px-4 text-xs font-black transition-all border-b-2 flex items-center gap-2 ${
                    activeTab === 'products'
                      ? 'border-green-600 text-green-700'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Package size={16} />
                  <span>1. Productos & Ofertas ({products.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('banners')}
                  className={`pb-3 px-4 text-xs font-black transition-all border-b-2 flex items-center gap-2 ${
                    activeTab === 'banners'
                      ? 'border-green-600 text-green-700'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Image size={16} />
                  <span>2. Banners & Promociones ({banners.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('company');
                    setCompanyForm({ ...companyInfo });
                  }}
                  className={`pb-3 px-4 text-xs font-black transition-all border-b-2 flex items-center gap-2 ${
                    activeTab === 'company'
                      ? 'border-green-600 text-green-700'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <FileText size={16} />
                  <span>3. Datos de la Empresa & RIF</span>
                </button>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* PESTAÑA 1: GESTIÓN DE PRODUCTOS, PRECIOS Y OFERTAS */}
            {/* ========================================================================= */}
            {activeTab === 'products' && (
              <div className="space-y-6 animate-fade-in">
                {/* KPIs Informativos de Productos */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
                    <div className="p-3 bg-green-50 text-green-700 rounded-xl">
                      <Package size={22} />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 font-bold block">Productos en Catálogo</span>
                      <span className="text-xl font-black text-gray-900">{products.length} rubros</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                      <DollarSign size={22} />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 font-bold block">Tasa BCV Referencial</span>
                      <span className="text-xl font-black text-gray-900">{bcvRate.toFixed(2)} Bs/$</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                      <Sparkles size={22} />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 font-bold block">En Oferta Especial</span>
                      <span className="text-xl font-black text-gray-900">
                        {products.filter(p => p.isOffer).length} ofertas
                      </span>
                    </div>
                  </div>
                </div>

                {/* Formulario para Agregar Nuevo Producto */}
                {showAddProductForm ? (
                  <form onSubmit={handleAddNewProductSubmit} className="bg-white rounded-3xl p-6 md:p-8 border border-green-200 shadow-lg space-y-4 text-xs animate-fade-in">
                    <h3 className="text-sm font-extrabold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
                      <Plus size={18} className="text-green-600" />
                      <span>Agregar Nuevo Producto al Inventario</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Nombre del Producto *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Queso Semi-Duro Llanero"
                          value={newProductData.name}
                          onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-medium focus:bg-white focus:border-green-600"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Categoría *</label>
                        <select
                          value={newProductData.category}
                          onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-medium focus:bg-white focus:border-green-600"
                        >
                          {PRODUCT_CATEGORIES.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Precio en USD ($) *</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          placeholder="Ej. 8.50"
                          value={newProductData.price}
                          onChange={(e) => setNewProductData({ ...newProductData, price: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-bold text-green-700 focus:bg-white focus:border-green-600"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Unidad de Medida</label>
                        <input
                          type="text"
                          placeholder="Ej. Kg, Paquete, Litro"
                          value={newProductData.unit}
                          onChange={(e) => setNewProductData({ ...newProductData, unit: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-medium focus:bg-white focus:border-green-600"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">URL de Imagen (Opcional)</label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={newProductData.image}
                          onChange={(e) => setNewProductData({ ...newProductData, image: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-medium focus:bg-white focus:border-green-600"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Descripción Breve</label>
                        <input
                          type="text"
                          placeholder="Ej. Producto elaborado bajo estrictas normas..."
                          value={newProductData.description}
                          onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-medium focus:bg-white focus:border-green-600"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddProductForm(false)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs py-2.5 px-4 rounded-xl transition-all"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        style={{ backgroundColor: '#58A618' }}
                        className="hover:bg-green-600 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-md transition-all"
                      >
                        Guardar Producto
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowAddProductForm(true)}
                      style={{ backgroundColor: '#58A618' }}
                      className="hover:bg-green-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Plus size={16} />
                      <span>Agregar Nuevo Producto</span>
                    </button>
                  </div>
                )}

                {/* Tabla de Productos */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <input
                      type="text"
                      placeholder="Buscar producto por nombre o categoría..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full sm:w-80 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:bg-white focus:border-green-600 font-medium"
                    />

                    <button
                      type="button"
                      onClick={resetProductsToDefault}
                      className="text-xs text-gray-500 hover:text-red-600 font-semibold flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={14} />
                      <span>Restablecer Catálogo Original</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                          <th className="p-3">Producto</th>
                          <th className="p-3">Categoría</th>
                          <th className="p-3">Precio USD ($)</th>
                          <th className="p-3">Equiv. BCV</th>
                          <th className="p-3 text-center">Oferta</th>
                          <th className="p-3 text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-medium">
                        {filteredProducts.map(prod => (
                          <tr key={prod.id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="p-3 flex items-center gap-3">
                              <img
                                src={prod.images ? prod.images[0] : prod.image}
                                alt={prod.name}
                                className="w-10 h-10 object-cover rounded-xl border border-gray-200 shrink-0"
                              />
                              <div>
                                <span className="font-bold text-gray-900 block">{prod.name}</span>
                                <span className="text-[10px] text-gray-400">/ {prod.unit}</span>
                              </div>
                            </td>

                            <td className="p-3 text-gray-600">
                              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                {prod.categoryName}
                              </span>
                            </td>

                            <td className="p-3">
                              <div className="flex items-center gap-1">
                                <span className="text-gray-400 font-bold">$</span>
                                <input
                                  type="number"
                                  step="0.01"
                                  value={prod.price}
                                  onChange={(e) => handlePriceChange(prod.id, e.target.value)}
                                  className="w-20 bg-gray-50 border border-gray-300 rounded-lg px-2 py-1 font-black text-gray-900 text-xs focus:bg-white focus:border-green-600"
                                />
                              </div>
                            </td>

                            <td className="p-3 text-green-700 font-bold">
                              Bs. {(prod.price * bcvRate).toFixed(2)}
                            </td>

                            <td className="p-3 text-center">
                              <button
                                type="button"
                                onClick={() => handleToggleOffer(prod.id, prod.isOffer)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-black transition-all ${
                                  prod.isOffer
                                    ? 'bg-red-100 text-red-700 border border-red-200'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                              >
                                {prod.isOffer ? '🔥 OFERTA' : 'Normal'}
                              </button>
                            </td>

                            <td className="p-3 text-right">
                              <button
                                type="button"
                                onClick={() => deleteProduct(prod.id)}
                                className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                                title="Eliminar producto"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* PESTAÑA 2: GESTOR DE BANNERS Y PROMOCIONES */}
            {/* ========================================================================= */}
            {activeTab === 'banners' && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-base font-black text-gray-900 flex items-center gap-2">
                      <Image className="text-green-600" size={20} />
                      <span>Carrusel de Banners Promocionales</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Edita las imágenes principales, títulos y promociones visibles en la página de inicio.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAddBannerForm(!showAddBannerForm)}
                    style={{ backgroundColor: '#58A618' }}
                    className="hover:bg-green-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Plus size={16} />
                    <span>{showAddBannerForm ? 'Cancelar' : 'Agregar Nuevo Banner'}</span>
                  </button>
                </div>

                {/* Formulario Agregar Nuevo Banner */}
                {showAddBannerForm && (
                  <form onSubmit={handleAddNewBannerSubmit} className="bg-white rounded-3xl p-6 border border-green-200 shadow-lg space-y-4 text-xs animate-fade-in">
                    <h3 className="text-sm font-extrabold text-gray-900 border-b border-gray-100 pb-2">
                      Nuevo Slide de Banner
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Título del Banner *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. ¡Oferta Especial en Quesos Llaneros!"
                          value={newBannerData.title}
                          onChange={(e) => setNewBannerData({ ...newBannerData, title: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-medium focus:bg-white focus:border-green-600"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Etiqueta Badge</label>
                        <input
                          type="text"
                          placeholder="Ej. 100% Artesanal / 20% Descuento"
                          value={newBannerData.badge}
                          onChange={(e) => setNewBannerData({ ...newBannerData, badge: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-medium focus:bg-white focus:border-green-600"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-bold text-gray-700 mb-1">Subtítulo / Descripción</label>
                        <input
                          type="text"
                          placeholder="Ej. Queso duro y suave de primera seleccionado para tu hogar..."
                          value={newBannerData.subtitle}
                          onChange={(e) => setNewBannerData({ ...newBannerData, subtitle: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-medium focus:bg-white focus:border-green-600"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">URL de la Imagen de Fondo</label>
                        <input
                          type="url"
                          placeholder="https://images.unsplash.com/..."
                          value={newBannerData.image}
                          onChange={(e) => setNewBannerData({ ...newBannerData, image: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-medium focus:bg-white focus:border-green-600"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Texto del Botón CTA</label>
                        <input
                          type="text"
                          placeholder="Ej. Ver Lácteos / Comprar Ahora"
                          value={newBannerData.ctaText}
                          onChange={(e) => setNewBannerData({ ...newBannerData, ctaText: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-medium focus:bg-white focus:border-green-600"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="submit"
                        style={{ backgroundColor: '#58A618' }}
                        className="hover:bg-green-600 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-md transition-all"
                      >
                        Publicar Banner
                      </button>
                    </div>
                  </form>
                )}

                {/* Lista Editable de Banners */}
                <div className="space-y-4">
                  {banners.map((banner, index) => (
                    <div key={banner.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <span className="text-xs font-black text-green-700 bg-green-50 px-3 py-1 rounded-full">
                          Slide #{index + 1}
                        </span>

                        <button
                          type="button"
                          onClick={() => deleteBanner(banner.id)}
                          className="text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-1 transition-colors"
                        >
                          <Trash2 size={14} />
                          <span>Eliminar Banner</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        {/* Previsualización del Banner */}
                        <div className="relative rounded-2xl overflow-hidden bg-gray-900 h-36 border border-gray-200">
                          <img
                            src={banner.image}
                            alt={banner.title}
                            className="w-full h-full object-cover opacity-80"
                          />
                          <div className="absolute inset-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end text-white">
                            <span className="text-[9px] bg-green-600 px-2 py-0.5 rounded-full font-bold w-fit mb-1">
                              {banner.badge}
                            </span>
                            <span className="font-extrabold text-xs line-clamp-1">{banner.title}</span>
                          </div>
                        </div>

                        {/* Campos Editables del Banner */}
                        <div className="md:col-span-2 space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-gray-600 mb-1">Título</label>
                              <input
                                type="text"
                                value={banner.title}
                                onChange={(e) => handleBannerFieldChange(banner.id, 'title', e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2 text-xs font-bold text-gray-900 focus:bg-white focus:border-green-600"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-gray-600 mb-1">Etiqueta Badge</label>
                              <input
                                type="text"
                                value={banner.badge}
                                onChange={(e) => handleBannerFieldChange(banner.id, 'badge', e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2 text-xs font-bold text-gray-900 focus:bg-white focus:border-green-600"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 mb-1">Subtítulo</label>
                            <input
                              type="text"
                              value={banner.subtitle}
                              onChange={(e) => handleBannerFieldChange(banner.id, 'subtitle', e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2 text-xs font-medium text-gray-700 focus:bg-white focus:border-green-600"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-gray-600 mb-1">URL Imagen</label>
                              <input
                                type="url"
                                value={banner.image}
                                onChange={(e) => handleBannerFieldChange(banner.id, 'image', e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2 text-xs font-medium text-gray-700 focus:bg-white focus:border-green-600"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-gray-600 mb-1">Texto del Botón</label>
                              <input
                                type="text"
                                value={banner.ctaText}
                                onChange={(e) => handleBannerFieldChange(banner.id, 'ctaText', e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2 text-xs font-medium text-gray-700 focus:bg-white focus:border-green-600"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* PESTAÑA 3: INFORMACIÓN GENERAL DE LA EMPRESA & RIF */}
            {/* ========================================================================= */}
            {activeTab === 'company' && (
              <form onSubmit={handleCompanySave} className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6 text-xs animate-fade-in">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="text-base font-black text-gray-900 flex items-center gap-2">
                      <FileText className="text-green-600" size={20} />
                      <span>Información Institucional de Alimentos La Rosaliera</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Los cambios guardados aquí se actualizarán automáticamente en el Navbar, Footer, FAQ y Nosotros.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetCompany}
                    className="text-xs text-gray-400 hover:text-red-600 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw size={14} />
                    <span>Restablecer Valores Iniciales</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Nombre Comercial de la Empresa</label>
                    <input
                      type="text"
                      required
                      value={companyForm.name}
                      onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold text-gray-900 focus:bg-white focus:border-green-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">RIF Fiscal</label>
                    <input
                      type="text"
                      required
                      value={companyForm.rif}
                      onChange={(e) => setCompanyForm({ ...companyForm, rif: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold text-green-700 focus:bg-white focus:border-green-600"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-gray-700 mb-1">Eslogan Principal / Tagline</label>
                    <input
                      type="text"
                      value={companyForm.tagline}
                      onChange={(e) => setCompanyForm({ ...companyForm, tagline: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-medium text-gray-800 focus:bg-white focus:border-green-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Dirección Física en Barinas</label>
                    <input
                      type="text"
                      value={companyForm.address}
                      onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-medium text-gray-800 focus:bg-white focus:border-green-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Ciudad / Estado</label>
                    <input
                      type="text"
                      value={companyForm.city}
                      onChange={(e) => setCompanyForm({ ...companyForm, city: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-medium text-gray-800 focus:bg-white focus:border-green-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Teléfono de Atención</label>
                    <input
                      type="text"
                      value={companyForm.phone}
                      onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-medium text-gray-800 focus:bg-white focus:border-green-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Enlace Directo a WhatsApp</label>
                    <input
                      type="url"
                      value={companyForm.whatsappLink}
                      onChange={(e) => setCompanyForm({ ...companyForm, whatsappLink: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-medium text-gray-800 focus:bg-white focus:border-green-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Usuario de Instagram</label>
                    <input
                      type="text"
                      value={companyForm.instagram}
                      onChange={(e) => setCompanyForm({ ...companyForm, instagram: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-medium text-gray-800 focus:bg-white focus:border-green-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Horarios de Atención</label>
                    <input
                      type="text"
                      value={companyForm.hours}
                      onChange={(e) => setCompanyForm({ ...companyForm, hours: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-medium text-gray-800 focus:bg-white focus:border-green-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Tiempo de Despacho Express</label>
                    <input
                      type="text"
                      value={companyForm.deliveryTime}
                      onChange={(e) => setCompanyForm({ ...companyForm, deliveryTime: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-medium text-gray-800 focus:bg-white focus:border-green-600"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    style={{ backgroundColor: '#58A618' }}
                    className="hover:bg-green-600 text-white font-extrabold text-xs py-3 px-6 rounded-xl shadow-lg transition-all flex items-center gap-2"
                  >
                    <Save size={16} />
                    <span>Guardar Cambios de la Empresa</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
