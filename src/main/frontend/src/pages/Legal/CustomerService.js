import React from 'react'

function CustomerService() {
  return (
    // chatgpt generated
    <div class="container mx-auto mt-8">
      <h1 class="text-3xl font-semibold mb-4">Customer Service</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* <!-- Contact Information --> */}
        <div class="bg-white p-6 rounded shadow-md">
          <h2 class="text-xl font-semibold mb-4">Contact Information</h2>
          <p class="mb-2">If you have any questions or need assistance, feel free to reach out to us:</p>
          <ul class="list-disc ml-6">
            <li>Email: support@papaluz.com</li>
            <li>Phone: +4207756382222</li>
            {/* <!-- Add more contact information as needed --> */}
          </ul>
        </div>
        {/* <!-- Frequently Asked Questions --> */}
        <div class="bg-white p-6 rounded shadow-md">
          <h2 class="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <p class="mb-2">Here are some common questions and answers:</p>
          <ul class="list-disc ml-6">
            <li><strong>Q:</strong> How long does shipping take?</li>
            <li><strong>A:</strong> Shipping typically takes 3-5 business days.</li>
            {/* <!-- Add more FAQ items as needed --> */}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CustomerService