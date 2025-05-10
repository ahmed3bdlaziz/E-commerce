import { createSlice } from '@reduxjs/toolkit'

// Get language from localStorage or default to 'en'
const getLanguageFromLocalStorage = () => {
  return localStorage.getItem('language') || 'en'
}

// Get theme from localStorage or default to 'light'
const getThemeFromLocalStorage = () => {
  return localStorage.getItem('theme') || 'winter'
}

// Get translations based on language
const getTranslations = (language) => {
  if (language === 'ar') {
    return {
      signIn: 'تسجيل الدخول',
      signUpNow: 'اشترك الان واحصل علي خصم 20% علي اول اوردر 😊',
      // links
      home: 'الرئيسية',
      about: 'من نحن',
      products: 'المنتجات',
      orders: 'الطلبات',
      // Hero Section
      heroTitle: 'اعثر على ملابس تناسب ذوقك',
      heroSubtitle:
        'تصفح مجموعتنا المتنوعة من الملابس المصممة بعناية فائقة، والتي تُبرز شخصيتك وتُلبي ذوقك الرفيع.',
      heroBtn: 'تسوق الآن',
      count1: 'ماركات عالمية',
      count2: 'منتجات عالية الجودة',
      count3: 'عملاء راضون',
      // About Us
      AboutUs: 'من نحن',
      AboutUsSubtitle:
        'أهلاً بكم في ملاذنا المتألق، حيث تلتقي الأناقة بالرقي. منذ انطلاقتنا، حرصنا على تقديم أرقى تشكيلة من الملابس من أشهر الماركات العالمية. رسالتنا هي مساعدة كل عميل على التعبير عن شخصيته الفريدة من خلال الموضة.',
      viewAll: 'عرض الكل',
      // Filter
      filter: 'تصفيه',
      category: 'التصنيف',
      price: 'السعر',
      color: 'اللون',
      size: 'الحجم',
      ResetFilters: 'إعادة تعيين ',
      // sort
      Showing: 'عرض',
      results: 'النتائج',
      // single product
      SelectColor: ' الالون',
      SelectSize: ' الحجم',
      addToCart: 'اضف الى السلة',

      noProducts: 'لا توجد منتجات متاحة',
      newArrival: 'وصل حديثاً',
      topSelling: 'الأكثر مبيعاً',
      // cart
      cartTitle: 'عربة التسوق',
      shoppingCart: 'عربة التسوق',
      cleartBtn: 'إفراغ العربة',
      cartBtn: 'إتمام عملية الشراء',
      cartEmpty: 'عربة التسوق فارغة',
      cartEmptySubtitle: 'أضف بعض المنتجات إلى عربة التسوق لمعاينتها هنا.',
      cartEmptyBtn: 'استمرار التسوق',
      orderSummary: 'ملخص الطلب',
      subTotal: ' المجموع',
      shipping: ' الشحن',
      tax: ' الضريبة',
      orderTotal: ' الاجمالي',
      ProceedToCheckout: 'متابعة الدفع',
      LoginToCheckout: ' تسجيل الدخول للدفع',
      // cayegory page
      categoryTitle: 'تصفح حسب نوع الملابس',
      pants: 'بنطلون',
      shirts: 'قميص',
      shorts: 'شورت',
      tShirts: 'تيشرت',
      // Footer
      company: ' الشركة',
      About: 'حول',
      Features: 'الميزات',
      Works: 'الأعمال',
      Career: 'الوظائف',
      Help: 'المساعدة',
      CustomerSupport: 'دعم العملاء',
      DeliveryDetails: 'تفاصيل التوصيل',
      TermsConditions: 'الشروط والأحكام',
      PrivacyPolicy: 'سياسة الخصوصية',
      FAQ: 'الأسئلة الشائعة',
      Account: 'الحساب',
      ManageDeliveries: 'إدارة التوصيلات',
      Orders: 'الطلبات',
      Payments: 'المدفوعات',
      Resources: 'الموارد',
      FreeEBooks: 'كتب إلكترونية مجانية',
      DevelopmentTutorial: 'دليل التطوير',
      HowToBlog: 'كيفية الاستخدام - المدونة',
      YoutubePlaylist: 'قائمة تشغيل يوتيوب',
      // Newsletter Section
      newsletterTitle: 'ابق على اطلاع بأحدث عروضنا',
      placeholder: 'أدخل عنوان بريدك الإلكتروني',
      subscribe: 'اشترك',
      //  Copyright Section
      Copyright: 'حقوق الطبع والنشر ©',
      AllRightsReserved: 'جميع الحقوق محفوظة',
    }
  }
  return {
    signIn: 'Sign in',
    signUpNow: 'Sign up now amd get 20% off on first order 😊',
    // links
    home: 'home',
    about: 'about',
    products: 'products',
    orders: 'orders',
    // Hero Section
    heroTitle: 'FIND CLOTHES THAT MATCHES YOUR STYLE',
    heroSubtitle:
      'Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.',
    heroBtn: 'Shop Now',
    count1: 'International Brands',
    count2: 'High-Quality Products',
    count3: 'Happy Customers',
    // About Us
    AboutUs: 'About Us',
    AboutUsSubtitle:
      'Welcome to our fashion haven, where style meets sophistication. Since our inception, we’ve been dedicated to bringing you the finest selection of clothing from renowned international brands. Our mission is to help every customer express their unique personality through fashion.',
    viewAll: 'view all',
    // Filter
    filter: 'Filter',
    category: 'Category',
    price: 'Price',
    color: 'Color',
    size: 'Size',
    ResetFilters: 'Reset Filters',
    // sort
    Showing: 'Showing',
    results: 'results',
    // single product
    SelectColor: 'Select Colors',
    SelectSize: 'Select Colors',
    addToCart: 'Add to Cart',
    noProducts: 'No products available',
    newArrival: 'New Arrival',
    topSelling: 'Top Selling',
    // cart
    cartTitle: 'Cart',
    shoppingCart: 'Shopping Cart',
    cleartBtn: 'clear cart',
    cartBtn: 'Checkout',
    cartEmpty: 'Your cart is empty',
    cartEmptySubtitle: 'Add some items to your cart to see them here.',
    cartEmptyBtn: 'Continue Shopping',
    orderSummary: 'Order summary',
    subTotal: 'Sub Total',
    shipping: 'Shipping',
    tax: 'Tax',
    orderTotal: 'order Total',
    ProceedToCheckout: ' Proceed to Checkout',
    LoginToCheckout: '  Login to Checkout',
    // cayegory page
    categoryTitle: 'BROWSE BY DRESS STYLE',
    pants: 'Pants',
    shirts: 'Shirts',
    shorts: 'Shorts',
    tShirts: 'T-Shirts',
    // Footer
    company: 'Company',
    About: 'About',
    Features: 'Features',
    Works: 'Works',
    Career: 'Career',
    Help: 'help',
    CustomerSupport: 'Customer Support',
    DeliveryDetails: 'Delivery Details',
    TermsConditions: 'Terms & Conditions',
    PrivacyPolicy: 'Privacy Policy',
    FAQ: 'FAQ',
    Account: 'Account',
    ManageDeliveries: 'Manage Deliveries',
    Orders: 'Orders',
    Payments: 'Payments',
    Resources: 'Resources',
    FreeEBooks: 'Free EBooks',
    DevelopmentTutorial: 'Development Tutorial',
    HowToBlog: 'How To Blog',
    YoutubePlaylist: 'Youtube Playlist',
    // Newsletter Section
    newsletterTitle: 'STAY UP TO DATE ABOUT OUR LATEST OFFERS',
    placeholder: 'Enter your email address',
    subscribe: 'Subscribe',
    //  Copyright Section
    Copyright: 'Copyright ©',
    AllRightsReserved: 'All rights reserved',
  }
}

// Initialize language from localStorage
const initialLanguage = getLanguageFromLocalStorage()
// Initialize theme from localStorage
const initialTheme = getThemeFromLocalStorage()

const initialState = {
  language: initialLanguage,
  direction: initialLanguage === 'ar' ? 'rtl' : 'ltr',
  translations: getTranslations(initialLanguage),
  theme: initialTheme,
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      const language = action.payload
      state.language = language
      state.direction = language === 'ar' ? 'rtl' : 'ltr'
      state.translations = getTranslations(language)

      // Save to localStorage
      localStorage.setItem('language', language)
    },
    setTheme: (state, action) => {
      const theme = action.payload
      state.theme = theme

      // Save to localStorage
      localStorage.setItem('theme', theme)

      // Apply theme to document
      document.documentElement.setAttribute('data-theme', theme)
    },
  },
})

export const { setLanguage, setTheme } = languageSlice.actions

// Selectors
export const selectLanguage = (state) => state.language.language
export const selectDirection = (state) => state.language.direction
export const selectTranslations = (state) => state.language.translations
export const selectTheme = (state) => state.language.theme

export default languageSlice.reducer
