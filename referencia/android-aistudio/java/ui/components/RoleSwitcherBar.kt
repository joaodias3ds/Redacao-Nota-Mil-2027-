package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.SwapHoriz
import androidx.compose.material.icons.outlined.AdminPanelSettings
import androidx.compose.material.icons.outlined.FamilyRestroom
import androidx.compose.material.icons.outlined.Person
import androidx.compose.material.icons.outlined.School
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Icon
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
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.UserRole
import com.example.ui.theme.DarkCardBg
import com.example.ui.theme.PinkLight
import com.example.ui.theme.PinkPrimary
import com.example.ui.theme.TextMuted
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary

@Composable
fun RoleSwitcherBar(
  currentRole: UserRole,
  onSelectRole: (UserRole) -> Unit,
  modifier: Modifier = Modifier
) {
  var showModal by remember { mutableStateOf(false) }

  Surface(
    modifier = modifier
      .fillMaxWidth()
      .statusBarsPadding()
      .padding(horizontal = 16.dp, vertical = 6.dp),
    shape = RoundedCornerShape(16.dp),
    color = Color(0xFF1E1E24),
    shadowElevation = 2.dp
  ) {
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .clickable { showModal = true }
        .padding(horizontal = 14.dp, vertical = 8.dp)
        .testTag("btn_open_role_switcher"),
      horizontalArrangement = Arrangement.SpaceBetween,
      verticalAlignment = Alignment.CenterVertically
    ) {
      Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(8.dp)
      ) {
        Box(
          modifier = Modifier
            .size(24.dp)
            .clip(CircleShape)
            .background(PinkPrimary),
          contentAlignment = Alignment.Center
        ) {
          Icon(
            imageVector = getRoleIcon(currentRole),
            contentDescription = null,
            tint = Color.White,
            modifier = Modifier.size(14.dp)
          )
        }

        Text(
          text = "Modo Atual: ${currentRole.label}",
          color = Color.White,
          fontSize = 12.sp,
          fontWeight = FontWeight.Bold
        )
        Text(
          text = "(${currentRole.badge})",
          color = Color(0xFFD1D5DB),
          fontSize = 11.sp
        )
      }

      Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(4.dp)
      ) {
        Text(
          text = "Trocar Perfil",
          color = Color(0xFFF472B6),
          fontSize = 11.sp,
          fontWeight = FontWeight.Bold
        )
        Icon(
          imageVector = Icons.Default.SwapHoriz,
          contentDescription = "Trocar",
          tint = Color(0xFFF472B6),
          modifier = Modifier.size(16.dp)
        )
      }
    }
  }

  if (showModal) {
    AlertDialog(
      onDismissRequest = { showModal = false },
      title = {
        Text(
          text = "Alternar Perfil do Curso",
          fontWeight = FontWeight.Bold,
          color = TextPrimary
        )
      },
      text = {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
          Text(
            text = "Selecione a visualização desejada para testar o sistema completo:",
            fontSize = 13.sp,
            color = TextSecondary
          )

          UserRole.values().forEach { role ->
            val isSelected = currentRole == role
            Surface(
              modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(12.dp))
                .clickable {
                  onSelectRole(role)
                  showModal = false
                }
                .testTag("role_option_${role.name}"),
              shape = RoundedCornerShape(12.dp),
              color = if (isSelected) Color(0xFFFFF0F5) else Color(0xFFF9FAFC),
              border = androidx.compose.foundation.BorderStroke(
                1.dp,
                if (isSelected) PinkPrimary else Color(0xFFE5E7EB)
              )
            ) {
              Row(
                modifier = Modifier.padding(14.dp),
                verticalAlignment = Alignment.CenterVertically
              ) {
                Box(
                  modifier = Modifier
                    .size(36.dp)
                    .clip(CircleShape)
                    .background(if (isSelected) PinkPrimary else Color(0xFFE5E7EB)),
                  contentAlignment = Alignment.Center
                ) {
                  Icon(
                    imageVector = getRoleIcon(role),
                    contentDescription = null,
                    tint = if (isSelected) Color.White else TextSecondary,
                    modifier = Modifier.size(20.dp)
                  )
                }

                Spacer(modifier = Modifier.width(12.dp))

                Column {
                  Text(
                    text = role.label,
                    fontWeight = FontWeight.Bold,
                    fontSize = 15.sp,
                    color = if (isSelected) PinkPrimary else TextPrimary
                  )
                  Text(
                    text = role.badge,
                    fontSize = 12.sp,
                    color = TextSecondary
                  )
                }
              }
            }
          }
        }
      },
      confirmButton = {
        TextButton(onClick = { showModal = false }) {
          Text("Fechar", color = PinkPrimary)
        }
      }
    )
  }
}

private fun getRoleIcon(role: UserRole): ImageVector {
  return when (role) {
    UserRole.ALUNO -> Icons.Outlined.Person
    UserRole.PROFESSOR -> Icons.Outlined.School
    UserRole.RESPONSAVEL -> Icons.Outlined.FamilyRestroom
    UserRole.ADMIN -> Icons.Outlined.AdminPanelSettings
  }
}
