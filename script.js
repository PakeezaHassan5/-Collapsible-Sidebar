document.addEventListener("DOMContentLoaded", function() {
  const toggleBtn = document.getElementById("toggleBtn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const toggleIcon = toggleBtn.querySelector("i");
  const themeToggle = document.getElementById("themeToggle");
  const logoutBtn = document.getElementById("logoutBtn");
  const searchInput = document.querySelector('.search-box input');
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

  function openSidebar() {
    sidebar.classList.add("open");
    overlay.classList.add("active");
    toggleIcon.classList.remove("fa-bars");
    toggleIcon.classList.add("fa-times");
  }

  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
    toggleIcon.classList.remove("fa-times");
    toggleIcon.classList.add("fa-bars");
  }
  toggleBtn.addEventListener("click", () => {
    if (sidebar.classList.contains("open")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  overlay.addEventListener("click", closeSidebar);

  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });

  sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.id !== 'logoutBtn') {
        e.preventDefault();
        sidebarLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        closeSidebar();
      }
    });
  });

  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const navItems = document.querySelectorAll('.sidebar-nav a');
    
    navItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(searchTerm)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });

  function performLogout() {
    alert('You have been logged out from Elevvo successfully!');
    closeSidebar();
  }

  logoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    performLogout();
  });

  // Mobile swipe functionality
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);
  
  function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchStartX < 30 && touchEndX - touchStartX > swipeThreshold) {
      openSidebar();
    }
    if (sidebar.classList.contains('open') && touchStartX - touchEndX > swipeThreshold) {
      closeSidebar();
    }
  }
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && sidebar.classList.contains('open') && 
        !sidebar.contains(e.target) && e.target !== toggleBtn) {
      closeSidebar();
    }
  });

  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });
});

