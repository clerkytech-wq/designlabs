const sharp = require('sharp');

async function test() {
  const meta = await sharp('public/images/66aa317d63dbaa6a0cb17b4a_Property_1=Home_2.png').metadata();
  console.log('Property 1=Home 2 meta:', meta);
}
test();
