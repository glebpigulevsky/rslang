
export const getSavannahCurrentWords = (wrong, correct) => `
<div class="savannah__start_final_wrong">
    <div class="savannah__start_final_wrong_title">
    <span>Errors:</span> ${wrong}
    </div>
    </div>
    <div class="savannah__start_final_valid">
    <div class="savannah__start_final_valid_title">
    <span>Correct:</span> ${correct}
    <div>
</div>`;
export const getSavannahStatistics = (value) => `
    <div class="savannah__start_statistics_record">${value}</div>
`;
