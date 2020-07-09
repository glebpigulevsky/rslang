export const getSavannahResultAnswear = ({ word, translate, audio, image, textExample }) => `   
<div class="savannah__start_final_answear">
    <div class="savannah__start_final_audio" data-audio=${audio}></div>
    <div class="savannah__start_final_eng tooltip">
        ${word}
        <div><img src="${image}">
        </div>
    </div>
    <div class="savannah__start_final_transl">${translate}</div>
    
</div>`;
