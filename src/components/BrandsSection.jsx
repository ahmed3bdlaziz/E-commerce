const BrandsSection = () => {
  const brands = [
    {
      name: 'VERSACE',
      url: 'https://www.versace.com',
    },
    {
      name: 'ZARA',
      url: 'https://www.zara.com',
    },
    {
      name: 'GUCCI',
      url: 'https://www.gucci.com',
    },
    {
      name: 'PRADA',
      url: 'https://www.prada.com',
    },
    {
      name: 'Calvin Klein',
      url: 'https://www.calvinklein.com',
    },
  ]

  return (
    <div className="w-full bg-black py-4">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-6 md:gap-4 justify-between items-center">
        {brands.map((brand, index) => (
          <a
            key={index}
            href={brand.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-xl md:text-3xl font-semibold hover:text-gray-300 cursor-pointer transition-colors"
          >
            {brand.name}
          </a>
        ))}
      </div>
    </div>
  )
}

export default BrandsSection
