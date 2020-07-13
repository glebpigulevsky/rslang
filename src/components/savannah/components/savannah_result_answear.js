export const getSavannahResultAnswer = ({ word, translate, audio }) => `   
<div class="savannah__start_final_answear">
    <div class="savannah__start_final_audio" data-audio=${audio}></div>
    <div class="savannah__start_final_eng">${word}</div>
    <div class="savannah__start_final_transl">${translate}</div>
</div>`;
