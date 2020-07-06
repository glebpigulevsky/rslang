export const getSavannahAnswears = ({
  first, second, third, fourth,
}) => `
<div class="savannah__answears" id="js-savannah__answears">
    <div class="savannah__answear" data-answear="${first}">${first}<span class="savannah__answear_number">1</span></div>
    <div class="savannah__answear" data-answear="${second}">${second}<span class="savannah__answear_number">2</span></div>
    <div class="savannah__answear" data-answear="${third}">${third}<span class="savannah__answear_number">3</span></div>
    <div class="savannah__answear" data-answear="${fourth}">${fourth}<span class="savannah__answear_number">4</span></div>
</div>`;
