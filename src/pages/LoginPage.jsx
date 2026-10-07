import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Lock, Mail, User, Phone, MapPin, Eye, EyeOff, 
  ArrowLeft, LogIn, UserPlus, CreditCard 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/common/Logo';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, register, loading, error: authError } = useAuth();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');

  // Form Data con los 6 campos requeridos para el Registro
  const [formData, setFormData] = useState({
    name: '',
    cedula: '',
    address: 'Alto Barinas, Barinas',
    email: '',
    password: '',
    phone: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (isRegisterMode) {
      if (!formData.name.trim()) {
        setFormError('Por favor ingresa tu Nombre Completo.');
        return;
      }
      if (!formData.cedula.trim()) {
        setFormError('Por favor ingresa tu Cédula de Identidad.');
        return;
      }
      if (!formData.address.trim()) {
        setFormError('Por favor ingresa tu Dirección de Vivienda.');
        return;
      }
      if (!formData.email.trim()) {
        setFormError('Por favor ingresa tu Correo Electrónico.');
        return;
      }
      if (formData.password.length < 4) {
        setFormError('La contraseña debe tener al menos 4 caracteres.');
        return;
      }
      if (!formData.phone.trim()) {
        setFormError('Por favor ingresa tu Teléfono de Contacto.');
        return;
      }

      const result = await register(formData);
      if (result.success) {
        navigate(-1); // Volver a la página anterior
      } else {
        setFormError(result.error);
      }
    } else {
      if (!formData.email.trim() || !formData.password) {
        setFormError('Ingresa tu correo y contraseña.');
        return;
      }

      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate(-1);
      } else {
        setFormError(result.error);
      }
    }
  };

  return (
    <div className="bg-gray-50/70 min-h-screen py-10 pb-28 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        
        {/* Botón Volver */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-green-700 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-2xs hover:shadow-sm transition-all"
        >
          <ArrowLeft size={16} />
          <span>Volver a la Tienda</span>
        </Link>

        {/* Tarjeta de Autenticación Ejecutiva */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl space-y-6">
          
          {/* Logo y Encabezado */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-3">
              <Logo className="w-12 h-12" showText={false} />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">
              {isRegisterMode ? 'Crear Cuenta en La Rosaliera' : 'Iniciar Sesión'}
            </h1>
            <p className="text-xs text-gray-500">
              {isRegisterMode
                ? 'Ingresa tus datos para registrarte y realizar tus pedidos en Barinas.'
                : 'Accede a tu cuenta de Alimentos La Rosaliera.'}
            </p>
          </div>

          {/* Selector de Pestañas (Iniciar Sesión / Registro) */}
          <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-2xl text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(false);
                setFormError('');
              }}
              className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                !isRegisterMode
                  ? 'bg-white text-green-700 shadow-xs font-extrabold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <LogIn size={15} />
              <span>Ingresar</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(true);
                setFormError('');
              }}
              className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                isRegisterMode
                  ? 'bg-white text-green-700 shadow-xs font-extrabold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <UserPlus size={15} />
              <span>Registrarse</span>
            </button>
          </div>

          {/* Mensaje de Error */}
          {(formError || authError) && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl font-medium animate-fade-in">
              ⚠️ {formError || authError}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* 1. NOMBRE COMPLETO (Solo en Registro) */}
            {isRegisterMode && (
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nombre Completo *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 text-gray-400" size={16} />
                  <input
                    type="text"
                    required
                    placeholder="Ej. María Pérez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all font-medium"
                  />
                </div>
              </div>
            )}

            {/* 2. CÉDULA DE IDENTIDAD (Solo en Registro) */}
            {isRegisterMode && (
              <div>
                <label className="block font-bold text-gray-700 mb-1">Cédula de Identidad *</label>
                <div className="relative">
                  <CreditCard className="absolute left-3.5 top-3 text-gray-400" size={16} />
                  <input
                    type="text"
                    required
                    placeholder="Ej. V-12.345.678"
                    value={formData.cedula}
                    onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all font-medium"
                  />
                </div>
              </div>
            )}

            {/* 3. DIRECCIÓN DE VIVIENDA (Solo en Registro) */}
            {isRegisterMode && (
              <div>
                <label className="block font-bold text-gray-700 mb-1">Dirección de Vivienda *</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 text-gray-400" size={16} />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Urb. Alto Barinas Norte, Calle 5, Casa #12"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all font-medium"
                  />
                </div>
              </div>
            )}

            {/* 4. CORREO ELECTRÓNICO (Ambos modos) */}
            <div>
              <label className="block font-bold text-gray-700 mb-1">Correo Electrónico *</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 text-gray-400" size={16} />
                <input
                  type="email"
                  required
                  placeholder="ejemplo@correo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all font-medium"
                />
              </div>
            </div>

            {/* 5. CONTRASEÑA (Ambos modos) */}
            <div>
              <label className="block font-bold text-gray-700 mb-1">Contraseña *</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 text-gray-400" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-10 focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* 6. TELÉFONO DE CONTACTO (Solo en Registro) */}
            {isRegisterMode && (
              <div>
                <label className="block font-bold text-gray-700 mb-1">Teléfono de Contacto *</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 text-gray-400" size={16} />
                  <input
                    type="tel"
                    required
                    placeholder="Ej. 0414-1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-3 focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all font-medium"
                  />
                </div>
              </div>
            )}

            {/* Botón Principal Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: '#58A618' }}
              className="w-full hover:bg-green-600 text-white font-black text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isRegisterMode ? (
                <>
                  <UserPlus size={17} />
                  <span>Crear Cuenta Gratis</span>
                </>
              ) : (
                <>
                  <LogIn size={17} />
                  <span>Iniciar Sesión</span>
                </>
              )}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}
