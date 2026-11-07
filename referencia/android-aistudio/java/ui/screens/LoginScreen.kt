package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Create
import androidx.compose.material.icons.outlined.Edit
import androidx.compose.material.icons.outlined.Security
import androidx.compose.material.icons.outlined.Visibility
import androidx.compose.material.icons.outlined.VisibilityOff
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.BorderLight
import com.example.ui.theme.PinkLight
import com.example.ui.theme.PinkPrimary
import com.example.ui.theme.TextMuted
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary

@Composable
fun LoginScreen(
  onLoginSuccess: (email: String) -> Unit,
  modifier: Modifier = Modifier
) {
  var email by remember { mutableStateOf("marina@email.com") }
  var password by remember { mutableStateOf("••••••••") }
  var passwordVisible by remember { mutableStateOf(false) }
  var showForgotDialog by remember { mutableStateOf(false) }
  var showSecretariaDialog by remember { mutableStateOf(false) }

  val focusManager = LocalFocusManager.current
  val scrollState = rememberScrollState()

  Column(
    modifier = modifier
      .fillMaxSize()
      .background(Color.White)
      .statusBarsPadding()
      .navigationBarsPadding()
      .imePadding()
      .verticalScroll(scrollState)
      .padding(horizontal = 24.dp, vertical = 20.dp),
    horizontalAlignment = Alignment.Start
  ) {
    Spacer(modifier = Modifier.height(20.dp))

    // Top Pen App Icon Badge (matching page 2 icon)
    Box(
      modifier = Modifier
        .size(48.dp)
        .clip(RoundedCornerShape(16.dp))
        .background(PinkPrimary),
      contentAlignment = Alignment.Center
    ) {
      Icon(
        imageVector = Icons.Outlined.Edit,
        contentDescription = "App Redação Icon",
        tint = Color.White,
        modifier = Modifier.size(26.dp)
      )
    }

    Spacer(modifier = Modifier.height(24.dp))

    // Header
    Text(
      text = "Entrar",
      fontSize = 32.sp,
      fontWeight = FontWeight.Bold,
      color = TextPrimary
    )

    Spacer(modifier = Modifier.height(8.dp))

    Text(
      text = "Use o e-mail do convite que o curso enviou para você.",
      fontSize = 15.sp,
      color = TextSecondary,
      lineHeight = 22.sp
    )

    Spacer(modifier = Modifier.height(28.dp))

    // E-mail Field
    Text(
      text = "E-mail",
      fontSize = 14.sp,
      fontWeight = FontWeight.SemiBold,
      color = TextPrimary
    )
    Spacer(modifier = Modifier.height(6.dp))
    OutlinedTextField(
      value = email,
      onValueChange = { email = it },
      modifier = Modifier
        .fillMaxWidth()
        .testTag("login_input_email"),
      placeholder = { Text("nome@email.com", color = TextMuted) },
      singleLine = true,
      keyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Email,
        imeAction = ImeAction.Next
      ),
      shape = RoundedCornerShape(14.dp),
      colors = OutlinedTextFieldDefaults.colors(
        focusedBorderColor = PinkPrimary,
        unfocusedBorderColor = BorderLight,
        focusedContainerColor = Color.Transparent,
        unfocusedContainerColor = Color.Transparent
      )
    )

    Spacer(modifier = Modifier.height(20.dp))

    // Senha Field
    Text(
      text = "Senha",
      fontSize = 14.sp,
      fontWeight = FontWeight.SemiBold,
      color = TextPrimary
    )
    Spacer(modifier = Modifier.height(6.dp))
    OutlinedTextField(
      value = password,
      onValueChange = { password = it },
      modifier = Modifier
        .fillMaxWidth()
        .testTag("login_input_password"),
      placeholder = { Text("Sua senha", color = TextMuted) },
      singleLine = true,
      visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
      trailingIcon = {
        IconButton(onClick = { passwordVisible = !passwordVisible }) {
          Icon(
            imageVector = if (passwordVisible) Icons.Outlined.Visibility else Icons.Outlined.VisibilityOff,
            contentDescription = if (passwordVisible) "Ocultar senha" else "Mostrar senha",
            tint = TextMuted
          )
        }
      },
      keyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Password,
        imeAction = ImeAction.Done
      ),
      keyboardActions = KeyboardActions(
        onDone = {
          focusManager.clearFocus()
          onLoginSuccess(email)
        }
      ),
      shape = RoundedCornerShape(14.dp),
      colors = OutlinedTextFieldDefaults.colors(
        focusedBorderColor = PinkPrimary,
        unfocusedBorderColor = BorderLight,
        focusedContainerColor = Color.Transparent,
        unfocusedContainerColor = Color.Transparent
      )
    )

    // Esqueci minha senha
    Box(
      modifier = Modifier
        .fillMaxWidth()
        .padding(top = 8.dp),
      contentAlignment = Alignment.CenterEnd
    ) {
      Text(
        text = "Esqueci minha senha",
        color = PinkPrimary,
        fontSize = 14.sp,
        fontWeight = FontWeight.Medium,
        modifier = Modifier
          .clickable { showForgotDialog = true }
          .padding(vertical = 4.dp)
          .testTag("login_forgot_password")
      )
    }

    Spacer(modifier = Modifier.height(24.dp))

    // Entrar Button
    Button(
      onClick = { onLoginSuccess(email) },
      modifier = Modifier
        .fillMaxWidth()
        .height(54.dp)
        .testTag("login_btn_submit"),
      shape = RoundedCornerShape(27.dp),
      colors = ButtonDefaults.buttonColors(
        containerColor = PinkPrimary,
        contentColor = Color.White
      )
    ) {
      Text(
        text = "Entrar",
        fontSize = 16.sp,
        fontWeight = FontWeight.SemiBold
      )
    }

    Spacer(modifier = Modifier.height(28.dp))

    // Under 18 Card Notice
    Surface(
      modifier = Modifier.fillMaxWidth(),
      shape = RoundedCornerShape(16.dp),
      color = Color(0xFFFFF0F5)
    ) {
      Row(
        modifier = Modifier.padding(16.dp),
        verticalAlignment = Alignment.Top
      ) {
        Box(
          modifier = Modifier
            .size(24.dp)
            .clip(CircleShape)
            .background(PinkPrimary.copy(alpha = 0.15f)),
          contentAlignment = Alignment.Center
        ) {
          Icon(
            imageVector = Icons.Outlined.Security,
            contentDescription = "Privacidade e Proteção",
            tint = PinkPrimary,
            modifier = Modifier.size(16.dp)
          )
        }

        Spacer(modifier = Modifier.width(12.dp))

        Text(
          text = "Tem menos de 18 anos? Seu responsável precisa aceitar os termos antes do seu primeiro acesso. Coletamos só o necessário.",
          fontSize = 13.sp,
          color = TextPrimary,
          lineHeight = 18.sp
        )
      }
    }

    Spacer(modifier = Modifier.weight(1f, fill = false))
    Spacer(modifier = Modifier.height(36.dp))

    // Footer
    Box(
      modifier = Modifier
        .fillMaxWidth()
        .padding(bottom = 12.dp),
      contentAlignment = Alignment.Center
    ) {
      Text(
        text = "Não tem convite? Fale com a secretaria do seu curso.",
        color = TextSecondary,
        fontSize = 13.sp,
        modifier = Modifier.clickable { showSecretariaDialog = true }
      )
    }
  }

  if (showForgotDialog) {
    AlertDialog(
      onDismissRequest = { showForgotDialog = false },
      title = { Text("Redefinição de senha") },
      text = {
        Text("Enviamos instruções de redefinição para o seu e-mail cadastrado na secretaria do curso ($email).")
      },
      confirmButton = {
        TextButton(onClick = { showForgotDialog = false }) {
          Text("Entendido", color = PinkPrimary)
        }
      }
    )
  }

  if (showSecretariaDialog) {
    AlertDialog(
      onDismissRequest = { showSecretariaDialog = false },
      title = { Text("Secretaria do Curso Presencial") },
      text = {
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
          Text("Telefone / WhatsApp: (11) 98765-4321")
          Text("E-mail: secretaria@cursoredacao.com.br")
          Text("Atendimento presencial: Seg a Sex, das 08h às 19h | Sáb, 08h às 14h")
        }
      },
      confirmButton = {
        TextButton(onClick = { showSecretariaDialog = false }) {
          Text("Fechar", color = PinkPrimary)
        }
      }
    )
  }
}
