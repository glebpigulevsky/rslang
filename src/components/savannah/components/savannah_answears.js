export const getSavannahAnswears = ({
  first, second, third, fourth,
}) => `
<div class="savannah__answears" id="js-savannah__answears">
    <div class="savannah__answear" data-answear="${first}" data-digit="1">${first}
      <span class="savannah__answear_number">1</span>
    </div>
    <div class="savannah__answear" data-answear="${second}" data-digit="2">${second}
      <span class="savannah__answear_number">2</span>
    </div>
    <div class="savannah__answear" data-answear="${third}" data-digit="3">${third}
      <span class="savannah__answear_number">3</span>
    </div>
    <div class="savannah__answear" data-answear="${fourth}" data-digit="4">${fourth}
      <span class="savannah__answear_number">4</span>
    </div>
</div>`;
