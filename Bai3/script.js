// ============================================
// DOM ELEMENTS
// ============================================
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const addProductBtn = document.getElementById("addProductBtn");
const addProductForm = document.getElementById("addProductForm");
const cancelBtn = document.getElementById("cancelBtn");
const productList = document.getElementById("product-list");

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

/**
 * Hàm tìm kiếm sản phẩm theo tên
 * Lọc và hiển thị các sản phẩm có tên chứa từ khóa tìm kiếm
 */
function searchProducts() {
  // Lấy từ khóa tìm kiếm và chuyển về chữ thường
  const searchTerm = searchInput.value.toLowerCase().trim();

  // Lấy tất cả các sản phẩm
  const productItems = document.querySelectorAll(".product-item");

  // Biến đếm số sản phẩm tìm thấy
  let foundCount = 0;

  // Duyệt qua từng sản phẩm
  productItems.forEach((product) => {
    // Lấy tên sản phẩm (từ thẻ h3)
    const productName = product.querySelector("h3").textContent.toLowerCase();

    // Kiểm tra tên sản phẩm có chứa từ khóa không
    if (productName.includes(searchTerm)) {
      // Hiển thị sản phẩm
      product.style.display = "";
      foundCount++;
    } else {
      // Ẩn sản phẩm
      product.style.display = "none";
    }
  });

  // Hiển thị thông báo nếu không tìm thấy sản phẩm nào
  showSearchResult(foundCount, searchTerm);
}

/**
 * Hiển thị thông báo kết quả tìm kiếm
 */
function showSearchResult(count, term) {
  // Xóa thông báo cũ nếu có
  const oldMessage = document.getElementById("searchMessage");
  if (oldMessage) {
    oldMessage.remove();
  }

  // Nếu có từ khóa tìm kiếm
  if (term) {
    const message = document.createElement("p");
    message.id = "searchMessage";
    message.style.cssText = `
      padding: 15px;
      margin: 15px 0;
      border-radius: 5px;
      font-weight: 600;
      text-align: center;
    `;

    if (count === 0) {
      message.textContent = `Không tìm thấy sản phẩm nào với từ khóa "${term}"`;
      message.style.backgroundColor = "#ffebee";
      message.style.color = "#c62828";
    } else {
      message.textContent = `Tìm thấy ${count} sản phẩm với từ khóa "${term}"`;
      message.style.backgroundColor = "#e8f5e9";
      message.style.color = "#2e7d32";
    }

    // Chèn thông báo trước danh sách sản phẩm
    productList.parentElement.insertBefore(message, productList);
  }
}

/**
 * Reset tìm kiếm - hiển thị lại tất cả sản phẩm
 */
function resetSearch() {
  const productItems = document.querySelectorAll(".product-item");
  productItems.forEach((product) => {
    product.style.display = "";
  });

  // Xóa thông báo
  const message = document.getElementById("searchMessage");
  if (message) {
    message.remove();
  }
}

// ============================================
// TOGGLE FORM "THÊM SẢN PHẨM"
// ============================================

/**
 * Hiển thị/ẩn form thêm sản phẩm
 */
function toggleAddProductForm() {
  // Sử dụng classList.toggle để thêm/xóa class 'hidden'
  addProductForm.classList.toggle("hidden");

  // Cuộn đến form nếu form được hiển thị
  if (!addProductForm.classList.contains("hidden")) {
    addProductForm.scrollIntoView({ behavior: "smooth", block: "nearest" });
    // Focus vào ô nhập đầu tiên
    document.getElementById("productName").focus();
  }
}

/**
 * Ẩn form thêm sản phẩm
 */
function hideAddProductForm() {
  addProductForm.classList.add("hidden");
  // Reset form
  addProductForm.reset();
}

// ============================================
// THÊM SẢN PHẨM MỚI
// ============================================

/**
 * Xử lý submit form thêm sản phẩm
 */
function handleAddProduct(event) {
  // Ngăn form submit mặc định (không reload trang)
  event.preventDefault();

  // Lấy giá trị từ form
  const productName = document.getElementById("productName").value.trim();
  const productDescription = document
    .getElementById("productDescription")
    .value.trim();
  const productPrice = document.getElementById("productPrice").value.trim();

  // Validate
  if (!productName || !productDescription || !productPrice) {
    alert("Vui lòng điền đầy đủ thông tin sản phẩm!");
    return;
  }

  // Tạo phần tử sản phẩm mới
  const newProduct = createProductElement(
    productName,
    productDescription,
    productPrice
  );

  // Thêm sản phẩm vào danh sách
  productList.appendChild(newProduct);

  // Hiệu ứng fade-in cho sản phẩm mới
  newProduct.style.opacity = "0";
  newProduct.style.transform = "translateY(20px)";

  setTimeout(() => {
    newProduct.style.transition = "all 0.5s ease";
    newProduct.style.opacity = "1";
    newProduct.style.transform = "translateY(0)";
  }, 10);

  // Reset form và ẩn
  addProductForm.reset();
  hideAddProductForm();

  // Hiển thị thông báo thành công
  showSuccessMessage("Đã thêm sản phẩm thành công!");

  // Cuộn đến sản phẩm mới
  newProduct.scrollIntoView({ behavior: "smooth", block: "nearest" });

  // Reset tìm kiếm để hiển thị sản phẩm mới
  searchInput.value = "";
  resetSearch();
}

/**
 * Tạo phần tử HTML cho sản phẩm mới
 */
function createProductElement(name, description, price) {
  const article = document.createElement("article");
  article.className = "product-item";

  const h3 = document.createElement("h3");
  h3.textContent = name;

  const descParagraph = document.createElement("p");
  descParagraph.className = "product-description";
  descParagraph.textContent = description;

  const priceParagraph = document.createElement("p");
  priceParagraph.className = "product-price";
  priceParagraph.textContent = price;

  article.appendChild(h3);
  article.appendChild(descParagraph);
  article.appendChild(priceParagraph);

  return article;
}

/**
 * Hiển thị thông báo thành công
 */
function showSuccessMessage(message) {
  const successMsg = document.createElement("div");
  successMsg.textContent = message;
  successMsg.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
    color: white;
    padding: 15px 25px;
    border-radius: 5px;
    box-shadow: 0 4px 15px rgba(39, 174, 96, 0.4);
    font-weight: 600;
    z-index: 9999;
    animation: slideIn 0.5s ease;
  `;

  document.body.appendChild(successMsg);

  // Tự động xóa sau 3 giây
  setTimeout(() => {
    successMsg.style.animation = "slideOut 0.5s ease";
    setTimeout(() => {
      successMsg.remove();
    }, 500);
  }, 3000);
}

// ============================================
// EVENT LISTENERS
// ============================================

// Sự kiện click nút tìm kiếm
searchBtn.addEventListener("click", searchProducts);

// Sự kiện nhấn Enter trong ô tìm kiếm
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchProducts();
  }

  // Reset khi xóa hết từ khóa
  if (searchInput.value.trim() === "") {
    resetSearch();
  }
});

// Sự kiện click nút "Thêm sản phẩm"
addProductBtn.addEventListener("click", toggleAddProductForm);

// Sự kiện click nút "Hủy"
cancelBtn.addEventListener("click", hideAddProductForm);

// Sự kiện submit form thêm sản phẩm
addProductForm.addEventListener("submit", handleAddProduct);

// ============================================
// ANIMATIONS (CSS)
// ============================================

// Thêm keyframes cho animations
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log("✅ JavaScript đã được tải thành công!");
console.log("📦 Các chức năng có sẵn:");
console.log("  - Tìm kiếm sản phẩm theo tên");
console.log("  - Thêm sản phẩm mới");
console.log("  - Hiển thị/ẩn form thêm sản phẩm");
