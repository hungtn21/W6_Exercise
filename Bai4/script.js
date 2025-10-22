// ============================================
// DOM ELEMENTS
// ============================================
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const addProductBtn = document.getElementById("addProductBtn");
const addProductForm = document.getElementById("addProductForm");
const cancelBtn = document.getElementById("cancelBtn");
const productList = document.getElementById("product-list");
const errorMsg = document.getElementById("errorMsg");

// Form input fields
const productNameInput = document.getElementById("productName");
const productDescInput = document.getElementById("productDescription");
const productPriceInput = document.getElementById("productPrice");

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
  // Xóa thông báo lỗi và validation classes
  clearErrorMessage();
  clearValidationClasses();
}

// ============================================
// THÊM SẢN PHẨM MỚI
// ============================================

/**
 * Hiển thị thông báo lỗi
 */
function showErrorMessage(message) {
  errorMsg.textContent = message;
  errorMsg.classList.add("show");

  // Cuộn đến thông báo lỗi
  errorMsg.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/**
 * Xóa thông báo lỗi
 */
function clearErrorMessage() {
  errorMsg.textContent = "";
  errorMsg.classList.remove("show");
}

/**
 * Xóa các class validation
 */
function clearValidationClasses() {
  productNameInput.classList.remove("valid", "invalid");
  productDescInput.classList.remove("valid", "invalid");
  productPriceInput.classList.remove("valid", "invalid");
}

/**
 * Validate dữ liệu form
 * @returns {Object} { valid: boolean, errors: Array<string> }
 */
function validateProductForm() {
  const errors = [];
  let isValid = true;

  // Lấy giá trị từ form
  const name = productNameInput.value.trim();
  const description = productDescInput.value.trim();
  const price = productPriceInput.value.trim();

  // Validate tên sản phẩm
  if (!name) {
    errors.push("Tên sản phẩm không được để trống");
    productNameInput.classList.add("invalid");
    productNameInput.classList.remove("valid");
    isValid = false;
  } else if (name.length < 3) {
    errors.push("Tên sản phẩm phải có ít nhất 3 ký tự");
    productNameInput.classList.add("invalid");
    productNameInput.classList.remove("valid");
    isValid = false;
  } else {
    productNameInput.classList.add("valid");
    productNameInput.classList.remove("invalid");
  }

  // Validate mô tả
  if (!description) {
    errors.push("Mô tả sản phẩm không được để trống");
    productDescInput.classList.add("invalid");
    productDescInput.classList.remove("valid");
    isValid = false;
  } else if (description.length < 10) {
    errors.push("Mô tả sản phẩm phải có ít nhất 10 ký tự");
    productDescInput.classList.add("invalid");
    productDescInput.classList.remove("valid");
    isValid = false;
  } else {
    productDescInput.classList.add("valid");
    productDescInput.classList.remove("invalid");
  }

  // Validate giá
  if (!price) {
    errors.push("Giá sản phẩm không được để trống");
    productPriceInput.classList.add("invalid");
    productPriceInput.classList.remove("valid");
    isValid = false;
  } else {
    const priceNumber = Number(price);

    if (isNaN(priceNumber)) {
      errors.push("Giá phải là một số hợp lệ");
      productPriceInput.classList.add("invalid");
      productPriceInput.classList.remove("valid");
      isValid = false;
    } else if (priceNumber <= 0) {
      errors.push("Giá phải lớn hơn 0");
      productPriceInput.classList.add("invalid");
      productPriceInput.classList.remove("valid");
      isValid = false;
    } else {
      productPriceInput.classList.add("valid");
      productPriceInput.classList.remove("invalid");
    }
  }

  return { valid: isValid, errors: errors };
}

/**
 * Format giá tiền thành dạng VNĐ
 * @param {number} price - Giá dạng số
 * @returns {string} - Giá đã format
 */
function formatPrice(price) {
  return `₫${price.toLocaleString("vi-VN")} / kg`;
}

/**
 * Xử lý submit form thêm sản phẩm
 */
function handleAddProduct(event) {
  // Ngăn form submit mặc định (không reload trang)
  event.preventDefault();

  // Xóa thông báo lỗi cũ
  clearErrorMessage();

  // Validate form
  const validation = validateProductForm();

  if (!validation.valid) {
    // Hiển thị thông báo lỗi
    const errorMessage =
      "❌ Vui lòng sửa các lỗi sau:\n" +
      validation.errors.map((err) => `• ${err}`).join("\n");
    showErrorMessage(errorMessage);
    return;
  }

  // Lấy giá trị từ form (đã validate)
  const productName = productNameInput.value.trim();
  const productDescription = productDescInput.value.trim();
  const productPrice = Number(productPriceInput.value.trim());

  // Format giá
  const formattedPrice = formatPrice(productPrice);

  // Tạo phần tử sản phẩm mới
  const newProduct = createProductElement(
    productName,
    productDescription,
    formattedPrice
  );

  // Thêm sản phẩm vào ĐẦU danh sách (prepend)
  productList.prepend(newProduct);

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
  showSuccessMessage(`✅ Đã thêm "${productName}" thành công!`);

  // Cuộn đến sản phẩm mới
  setTimeout(() => {
    newProduct.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 100);

  // Reset tìm kiếm để hiển thị sản phẩm mới
  searchInput.value = "";
  resetSearch();

  // Log thông tin sản phẩm đã thêm
  console.log("✅ Sản phẩm mới đã được thêm:", {
    name: productName,
    description: productDescription,
    price: formattedPrice,
  });
}

/**
 * Tạo phần tử HTML cho sản phẩm mới
 * @param {string} name - Tên sản phẩm
 * @param {string} description - Mô tả sản phẩm
 * @param {string} price - Giá sản phẩm (đã format)
 * @returns {HTMLElement} - Phần tử article mới
 */
function createProductElement(name, description, price) {
  // Cách 1: Sử dụng createElement (an toàn, tránh XSS)
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

  // Thêm badge "Mới" cho sản phẩm
  const badge = document.createElement("span");
  badge.className = "product-badge";
  badge.textContent = "MỚI";
  badge.style.cssText = `
    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    color: white;
    padding: 5px 10px;
    border-radius: 3px;
    font-size: 0.75rem;
    font-weight: 700;
    margin-left: 10px;
    display: inline-block;
  `;
  h3.appendChild(badge);

  // Xóa badge sau 5 giây
  setTimeout(() => {
    if (badge.parentElement) {
      badge.style.transition = "all 0.5s ease";
      badge.style.opacity = "0";
      badge.style.transform = "scale(0)";
      setTimeout(() => badge.remove(), 500);
    }
  }, 5000);

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
// REAL-TIME VALIDATION
// ============================================

/**
 * Real-time validation khi người dùng nhập liệu
 */
function setupRealTimeValidation() {
  // Validate tên sản phẩm
  productNameInput.addEventListener("input", () => {
    const value = productNameInput.value.trim();
    if (value.length >= 3) {
      productNameInput.classList.add("valid");
      productNameInput.classList.remove("invalid");
    } else if (value.length > 0) {
      productNameInput.classList.add("invalid");
      productNameInput.classList.remove("valid");
    } else {
      productNameInput.classList.remove("valid", "invalid");
    }
  });

  // Validate mô tả
  productDescInput.addEventListener("input", () => {
    const value = productDescInput.value.trim();
    if (value.length >= 10) {
      productDescInput.classList.add("valid");
      productDescInput.classList.remove("invalid");
    } else if (value.length > 0) {
      productDescInput.classList.add("invalid");
      productDescInput.classList.remove("valid");
    } else {
      productDescInput.classList.remove("valid", "invalid");
    }
  });

  // Validate giá
  productPriceInput.addEventListener("input", () => {
    const value = productPriceInput.value.trim();
    const priceNumber = Number(value);

    if (value && !isNaN(priceNumber) && priceNumber > 0) {
      productPriceInput.classList.add("valid");
      productPriceInput.classList.remove("invalid");
    } else if (value) {
      productPriceInput.classList.add("invalid");
      productPriceInput.classList.remove("valid");
    } else {
      productPriceInput.classList.remove("valid", "invalid");
    }
  });
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

// Setup real-time validation
setupRealTimeValidation();

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
// INITIALIZATION
// ============================================

/**
 * Khởi tạo ứng dụng khi DOM đã load
 */
function initializeApp() {
  console.log("JavaScript đã được tải thành công!");
  console.log("Các chức năng có sẵn:");
  console.log("  - Tìm kiếm sản phẩm theo tên (realtime)");
  console.log("  - Thêm sản phẩm mới với validation đầy đủ");
  console.log("  - Hiển thị/ẩn form thêm sản phẩm");
  console.log("  - Validation realtime khi nhập liệu");
  console.log("  - Format giá tự động");

  // Đếm số sản phẩm ban đầu
  const initialProducts = document.querySelectorAll(".product-item").length;
  console.log(`Số sản phẩm ban đầu: ${initialProducts}`);
}

// Gọi hàm khởi tạo
initializeApp();
