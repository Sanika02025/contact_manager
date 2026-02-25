document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const contactList = document.getElementById("contactList");
    const searchInput = document.getElementById("search");

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    let editIndex = -1;

    renderContacts();

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();

        if (!name || !email || !phone) {
            alert("Fill all fields");
            return;
        }

        const contact = { name, email, phone };

        if (editIndex === -1) {
            contacts.push(contact);
        } else {
            contacts[editIndex] = contact;
            editIndex = -1;
        }

        localStorage.setItem("contacts", JSON.stringify(contacts));
        form.reset();
        renderContacts();
    });

    function renderContacts() {
        contactList.innerHTML = "";

        contacts.forEach((c, index) => {
            const li = document.createElement("li");

            li.innerHTML = `
                <div class="contact-info">
                    <strong>${c.name}</strong>
                    <small>${c.email}</small>
                    <small>${c.phone}</small>
                </div>
                <div>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;

            li.querySelector(".delete-btn").onclick = () => {
                contacts.splice(index, 1);
                localStorage.setItem("contacts", JSON.stringify(contacts));
                renderContacts();
            };

            li.querySelector(".edit-btn").onclick = () => {
                nameInput.value = c.name;
                emailInput.value = c.email;
                phoneInput.value = c.phone;
                editIndex = index;
            };

            contactList.appendChild(li);
        });
    }

    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const value = searchInput.value.toLowerCase();
            document.querySelectorAll("#contactList li").forEach(li => {
                li.style.display = li.innerText.toLowerCase().includes(value)
                    ? "flex"
                    : "none";
            });
        });
    }

});