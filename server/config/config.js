// ===================================
// PUERTO
// ===================================
process.env.PORT = process.env.PORT || 3000;

// ===================================
// ENTORNO
// ===================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===================================
// VENCIMIENTO DEL TOKEN
// ===================================
// 60 Seg * 60 Min * 24Hs * 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 *30;

// ===================================
// SEED DE AUTENTICACION 
// ===================================
process.env.SEED = process.env.SEED  ||  'secret';

// ===================================
// BASE DE DATOS
// ===================================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB

// ===================================
// GOOGLE CLIENT ID
// ===================================
process.env.CLIENT_ID = process.env.CLIENT_ID || '1070407490738-kc8gioudh9doq34dpff2pmupe8jdu71a.apps.googleusercontent.com';