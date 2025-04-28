document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы управления
    const saveBtn = document.querySelector('.action-btn.primary');
    const openBtn = document.querySelector('.action-btn.secondary');
    const exportBtn = document.querySelector('.action-btn.accent');
    const zoomInBtn = document.querySelector('.tool-group .tool-btn:first-child');
    const zoomOutBtn = document.querySelector('.tool-group .tool-btn:last-child');
    const zoomValue = document.querySelector('.zoom-value');
    
    // Текущий уровень масштабирования
    let currentZoom = 100;
    
    // Функция для обновления отображения масштаба
    function updateZoom() {
        zoomValue.textContent = `${currentZoom}%`;
        svgMain.style.transform = `scale(${currentZoom / 100})`;
        svgMain.style.transformOrigin = '0 0';
    }

    
    
    // Обработчик для кнопки Save
    saveBtn.addEventListener('click', function() {
        // Сериализуем SVG в строку
        const svgString = new XMLSerializer().serializeToString(svgMain);
        console.log(svgString)
        // Сохраняем в localStorage
        localStorage.setItem('savedSvgDesign', svgString);
        
        // Визуальная обратная связь
        this.classList.add('active');
        setTimeout(() => this.classList.remove('active'), 300);
        
        console.log('Design saved successfully');
    });
    
    // Обработчик для кнопки Open
    openBtn.addEventListener('click', function() {
        // Получаем сохраненные данные
        const savedSvg = localStorage.getItem('savedSvgDesign');
        
        if (savedSvg) {
            // Очищаем текущий SVG и загружаем сохраненный
            svgMain.innerHTML = savedSvg;
            
           

            // Визуальная обратная связь
            this.classList.add('active');
            setTimeout(() => this.classList.remove('active'), 300);
            
            console.log('Design loaded successfully');
        } else {
            console.log('No saved designs found');
        }
    });
    
    // Обработчик для кнопки Export
    exportBtn.addEventListener('click', function() {
        // Сериализуем SVG в строку
        const svgString = new XMLSerializer().serializeToString(svgMain);
        
        // Создаем Blob объект
        const blob = new Blob([svgString], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);
        
        // Создаем временную ссылку для скачивания
        const a = document.createElement('a');
        a.href = url;
        a.download = 'design.svg';
        document.body.appendChild(a);
        a.click();
        
        // Убираем временные элементы
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
        
        // Визуальная обратная связь
        this.classList.add('active');
        setTimeout(() => this.classList.remove('active'), 300);
    });
    
    // Обработчик для увеличения масштаба
    zoomInBtn.addEventListener('click', function() {
        if (currentZoom < 300) {
            currentZoom += 10;
            updateZoom();
        }
    });
    
    // Обработчик для уменьшения масштаба
    zoomOutBtn.addEventListener('click', function() {
        if (currentZoom > 30) {
            currentZoom -= 10;
            updateZoom();
        }
    });
    
    // Добавляем поддержку колесика мыши для масштабирования
    svgMain.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        const delta = e.deltaY > 0 ? -5 : 5;
        const newZoom = Math.max(30, Math.min(300, currentZoom + delta));
        
        if (newZoom !== currentZoom) {
            currentZoom = newZoom;
            updateZoom();
        }
    });
    
    // Добавляем горячие клавиши
    document.addEventListener('keydown', function(e) {
        // Ctrl+S для сохранения
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            saveBtn.click();
        }
        
        // Ctrl+O для открытия
        if (e.ctrlKey && e.key === 'o') {
            e.preventDefault();
            openBtn.click();
        }
        
        // Ctrl+E для экспорта
        if (e.ctrlKey && e.key === 'e') {
            e.preventDefault();
            exportBtn.click();
        }
        
        // +/- для масштабирования
        if (e.key === '+' || e.key === '=') {
            e.preventDefault();
            zoomInBtn.click();
        }
        
        if (e.key === '-') {
            e.preventDefault();
            zoomOutBtn.click();
        }
    });
    
    // Инициализация
    updateZoom();
});