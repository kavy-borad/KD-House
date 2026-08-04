module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]', // Maintains original file name and extension
        },
      },
    ],
  },
};