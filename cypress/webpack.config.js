module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$|\.css$/,
        use: [
          'style-loader', // This will inject styles into the DOM
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        use: [
          { loader: 'url-loader?limit=100000' }
        ]
      }
    ]
  }
};
