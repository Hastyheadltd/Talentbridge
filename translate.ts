import axios from 'axios';

const translate = async (text: string, targetLang: string) => {
  try {
    const response = await axios.get(
      `https://api.lingvanex.com/v1/translate?text=${encodeURIComponent(
        text
      )}&to=${targetLang}&from=en`
    );
    return response.data.result;
  } catch (error) {
    console.error('Translation failed:', error);
    return text; 
  }
};

export default translate;
