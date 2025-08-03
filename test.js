// Função para carregar header e footer
function loadCommonElements() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
}

// Função para inicializar a página
function initPage(defaultTab) {
    loadCommonElements();
    
    // Ativa a aba padrão após um pequeno delay para garantir que o header foi carregado
    setTimeout(() => {
        openTab(defaultTab);
    }, 100);
}

document.addEventListener("DOMContentLoaded", function() {
    // Cada página deve chamar initPage() com sua aba padrão
});