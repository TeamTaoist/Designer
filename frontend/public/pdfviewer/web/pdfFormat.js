function PdfFormat(){
    window.haveShowPageList = '';
    window.gotoPageFrom = function (page) {
        PDFViewerApplication.pdfLinkService.goToPage(page);
    };
    window.displaySignature = function () {

        var currentPages = $('[data-page-number="' + PDFViewerApplication.page + '"]');

        var signatureLen = $('.base64-wrap').length;
        if ($(`#page-mask-${signatureLen}`).length > 0) return;
        $(currentPages[1]).append(`<div class="page-mask" id="page-mask-${signatureLen}"><img class="page-mask-del" id="page-mask-del-${signatureLen}" src="images/del.svg" /></div>`);
        $(`#page-mask-del-${signatureLen}`).on('click', function () {
            $(`#page-mask-${signatureLen}`).remove();
            return false;
        });

        let pWidth = parseFloat(currentPages[1].style.width);
        let pHeight = parseFloat(currentPages[1].style.height);
        $(`#page-mask-${signatureLen}`).on('click', function (e) {
            e.stopPropagation();

            if ($(`#signature-${signatureLen}`).length) {
                return;
            }
            var $this = $(this);
            $(this).append(`
            <div class="signature-wrap" id="signature-wrap-${signatureLen}">
              <img class="signature-del" id="signature-del-${signatureLen}" src="images/del.svg" />
              <img class="signature-save" id="signature-save-${signatureLen}" src="images/ok.svg" />
               <input type="text" id="signature-${signatureLen}" autocomplete="off" />
            </div>`);
            $(`#signature-wrap-${signatureLen}`).css({
                left: (e.offsetX/pWidth)*100 + '%',
                top: (e.offsetY /pHeight) * 100 + '%'
            });
            $(`#signature-save-${signatureLen}`).on('click', function () {
                var base64 = $(`#signature-${signatureLen}`).val();
                $(`#page-mask-${signatureLen}`).remove();
                $(currentPages[1]).append(`
              <div class="base64-wrap" id="base64-wrap-${signatureLen}">
                <img class="signature-remove" id="signature-remove-${signatureLen}" src="images/del.svg" />
                <div class="signature-show">${base64}</div>
              </div>`);

                $(`#base64-wrap-${signatureLen}`).css({
                    // left: e.offsetX + 'px',
                    // top: e.offsetY + 'px'
                    left: (e.offsetX/pWidth)*100 + '%',
                    top: (e.offsetY /pHeight) * 100 + '%'
                });
                $(`#base64-wrap-${signatureLen}`).Tdrag({
                    scope: '.page',
                    cbEnd: function () {
                        let obj = window.signatureList.find((item) => item.index === signatureLen)
                        if (obj) {
                            // obj.left = parseInt($(`#base64-wrap-${signatureLen}`).css('left'));
                            // obj.top = parseInt($(`#base64-wrap-${signatureLen}`).css('top'));
                            obj.left = (parseFloat($(`#base64-wrap-${signatureLen}`).css('left'))/pWidth).toFixed(4);
                            obj.top = (parseFloat($(`#base64-wrap-${signatureLen}`).css('top'))/pHeight).toFixed(4);
                        }
                    }
                });
                $(`#signature-remove-${signatureLen}`).on('click', function () {
                    $(`#base64-wrap-${signatureLen}`).remove();
                    window.signatureList = window.signatureList.filter((item) => signatureLen !== item.index)
                    // window.signatureList.splice(signatureLen, 1);
                    window.parent.signatureList = window.signatureList;
                    window.parent.getSignatureList && window.parent.getSignatureList(window.signatureList);
                });

                if (!window.signatureList) {
                    window.signatureList = [];
                }

                window.signatureList.push({
                    left: e.offsetX/pWidth,
                    top: e.offsetY /pHeight,
                    base64: base64,
                    index:signatureLen,
                    page: PDFViewerApplication.page
                });
                window.parent.signatureList = window.signatureList;
                window.parent.getSignatureList && window.parent.getSignatureList(window.signatureList);
                return false;
            });
            $(`#signature-del-${signatureLen}`).on('click', function () {
                $(`#signature-wrap-${signatureLen}`).remove();
                return false;
            });
        });
    };


    window.Signing = function () {

        var signatureList = window.signatureList || [];

        signatureList.map((item)=>{

            var nowPages = $('[data-page-number="' + item.page + '"]');
            console.log("===item",item)
            $(nowPages[1]).append(`
                <div class="base64-wrap" id="base64-wrap-${item.index}">
                <img class="signature-remove" id="signature-remove-${item.index}" src="images/del.svg" />
                <div class="signature-show">${item.base64}</div>
              </div>`);
            $(`#base64-wrap-${item.index}`).css({
                left: item.left*100 + '%',
                top: item.top*100 + '%'
            });
            let pWidth = parseFloat(nowPages[1].style.width);
            let pHeight = parseFloat(nowPages[1].style.height);

            $(`#base64-wrap-${item.index}`).Tdrag({
                scope: '.page',
                cbEnd: function () {
                    let obj = window.signatureList.find((itemInner) => itemInner.index === item.index)
                    if (obj) {
                        obj.left = (parseFloat($(`#base64-wrap-${item.index}`).css('left'))/pWidth).toFixed(4);
                        obj.top = (parseFloat($(`#base64-wrap-${item.index}`).css('top'))/pHeight).toFixed(4);
                    }
                }
            });
            $(`#signature-remove-${item.index}`).on('click', function () {
                $(`#base64-wrap-${item.index}`).remove();
                window.signatureList = window.signatureList.filter((itemInner) => item.index !== itemInner.index)
                // window.signatureList.splice(signatureLen, 1);
                window.parent.signatureList = window.signatureList;
                window.parent.getSignatureList && window.parent.getSignatureList(window.signatureList);
            });

            if (!window.signatureList) {
                window.signatureList = [];
            }

        })

    };

    window.showHaveSignedList = function (page) {
        var parentTimer = setInterval(() => {
            if (window.haveSignedList?.length) {
                clearInterval(parentTimer);
                var haveSignedList = window.haveSignedList || [];
                var haveShowPageList = window.haveShowPageList || '';

                if (haveShowPageList.indexOf(page) > -1) {
                    return;
                }

                window.haveShowPageList = haveShowPageList += page;
                var nowPages = $('[data-page-number="' + page + '"]');
                haveSignedList.forEach(function (haveSignd, index) {
                    if (haveSignd.page === page) {

                        var signatureLen = $('.base64-wrap').length;

                        $(nowPages[1]).append(`
                  <div class="base64-wrap" id="base64-wrap-${signatureLen}">
                     <div class="base64 signature-show" id="js-base64-${signatureLen}">${haveSignd.base64}</div>
                  </div>`);
                        $(`#base64-wrap-${signatureLen}`).css({
                            // left: haveSignd.left + 'px',
                            // top: haveSignd.top + 'px'
                            left: haveSignd.left*100 + '%',
                            top: haveSignd.top*100 + '%'
                        });
                    }
                });
                // window.finishList = window.haveSignedList;
                // window.parent.finishList = window.finishList;
                // window.parent.getFinishList && window.parent.getFinishList(window.haveSignedList);
            }
        }, 100);
    };


}